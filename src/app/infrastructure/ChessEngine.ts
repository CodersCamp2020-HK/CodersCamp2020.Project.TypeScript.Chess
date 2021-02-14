import { PieceType, Cord, CordWithMoveType, Side, Piece } from '../domain/basicChessTypes';
import { flattenChessboard } from '../utils/ChessboardHelpers';
import { ChessBoardView, IChessBoard } from '../domain/IChessBoard';
import { IChessEngine } from '../domain/IChessEngine';
import { getPossibleMovesForPawn } from '../utils/pawnMoves';
import {
    getPossibleMovesForBishop,
    getPossibleMovesForKing,
    getPossibleMovesForKnight,
    getPossibleMovesForQueen,
    getPossibleMovesForRook,
} from '../utils/Moves';
import _ from 'lodash';

export class ChessEngine implements IChessEngine {
    getMovesByPiece: Map<PieceType, (cord: Cord, boardState: IChessBoard) => CordWithMoveType[]>;

    constructor() {
        this.getMovesByPiece = new Map([
            [PieceType.Bishop, getPossibleMovesForBishop],
            [PieceType.King, getPossibleMovesForKing],
            [PieceType.Knight, getPossibleMovesForKnight],
            [PieceType.Queen, getPossibleMovesForQueen],
            [PieceType.Rook, getPossibleMovesForRook],
        ]);
    }

    getPossibleMovesForPiece(
        cord: Cord,
        boardState: IChessBoard,
        previousBoardState: ChessBoardView,
    ): CordWithMoveType[] {
        const piece = boardState.board[cord.x][cord.y];
        if (!piece) {
            return [];
        }
        if (piece.figType === PieceType.Pawn && previousBoardState) {
            const pawnMoves = getPossibleMovesForPawn(cord, boardState, previousBoardState);
            return pawnMoves;
        }
        const handler = this.getMovesByPiece.get(piece.figType);
        if (!handler) {
            return [];
        }
        return handler(cord, boardState);
    }

    getPossibleMovesForPieceWhenIsCheck(
        cord: Cord,
        boardState: IChessBoard,
        previousBoardState: ChessBoardView,
        possibleMoves: CordWithMoveType[],
    ): CordWithMoveType[] {
        const piece = boardState.board[cord.x][cord.y];
        if (!piece) {
            return [];
        }
        return this.excludeMovesOnAttackedSquares(cord, possibleMoves, boardState, previousBoardState);
    }

    isCheck(boardState: IChessBoard, side: Side, previousBoardState: ChessBoardView): boolean {
        const { board } = boardState;
        const allEnemyPieces = flattenChessboard(board).filter(
            (item): item is Piece => item !== null && item.side !== side && item.figType !== PieceType.King,
        );
        const allEnemyPiecesMoves = allEnemyPieces.map((piece) => {
            return this.getPossibleMovesForPiece({ x: piece.cord.x, y: piece.cord.y }, boardState, previousBoardState);
        });
        const king = boardState.getPieces(side, PieceType.King);
        if (!king) throw new Error('Król zbiegł z pola bitwy');
        const filteredResult = flattenChessboard(allEnemyPiecesMoves).filter(
            (item): item is CordWithMoveType => item !== null,
        );
        return filteredResult.some((item) => item.x === king[0].cord.x && item.y === king[0].cord.y);
    }

    isCheckmate(boardState: IChessBoard, side: Side, previousBoardState: ChessBoardView): boolean {
        return this.isCheck(boardState, side, previousBoardState)
            ? this.isStealemate(boardState, side, previousBoardState)
            : false;
    }

    isStealemate(boardState: IChessBoard, side: Side, previousBoardState: ChessBoardView): boolean {
        const { board } = boardState;
        const checkmateArr: boolean[] = [];
        const allMyPieces = flattenChessboard(board).filter(
            (item): item is Piece => item !== null && item.side === side,
        );
        allMyPieces.forEach((piece) => {
            const moves = this.getPossibleMovesForPiece(
                { x: piece.cord.x, y: piece.cord.y },
                boardState,
                previousBoardState,
            );
            const movesWitoutMoveTypes: Cord[] = moves.map((move) => _.pick(move, ['x', 'y']));
            movesWitoutMoveTypes.forEach((move) => {
                const clonePiece = _.cloneDeep(piece);
                const copyBoardState = _.cloneDeep(boardState);
                const copyPreviousBoardState = _.cloneDeep(boardState);
                copyBoardState.makeMove(clonePiece, move);
                checkmateArr.push(this.isCheck(copyBoardState, side, copyPreviousBoardState.board));
            });
        });
        return checkmateArr.every((item) => item === true);
    }

    excludeMovesOnAttackedSquares(
        pieceCord: Cord,
        possibleMoves: CordWithMoveType[],
        boardState: IChessBoard,
        previousBoardState: ChessBoardView,
    ): CordWithMoveType[] {
        const result: CordWithMoveType[] = possibleMoves.filter((move) => {
            const copiedBoardState = _.cloneDeep(boardState);
            const piece = copiedBoardState.getPiece(pieceCord);
            if (!piece) return false;
            copiedBoardState.makeMove(piece, { x: move.x, y: move.y });
            return !this.isCheck(copiedBoardState, piece.side, previousBoardState);
        });

        return result;
    }
}
