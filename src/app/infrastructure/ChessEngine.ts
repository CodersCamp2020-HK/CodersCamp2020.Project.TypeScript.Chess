import { PieceType, Cord, CordWithMoveType, Side, Piece } from '../domain/basicChessTypes';
import { flattenChessboard } from '../utils/ChessboardHelpers';
import { IChessBoard } from '../domain/IChessBoard';
import { IChessEngine } from '../domain/IChessEngine';
import { getPossibleMovesForPawn } from '../utils/pawnMoves';
import {
    getPossibleMovesForBishop,
    getPossibleMovesForKing,
    getPossibleMovesForKnight,
    getPossibleMovesForQueen,
    getPossibleMovesForRook,
} from '../utils/Moves';

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
        previousBoardState?: IChessBoard,
    ): CordWithMoveType[] {
        const piece = boardState.board[cord.x][cord.y];
        if (!piece) {
            return [];
        }
        if (piece.figType === PieceType.Pawn && previousBoardState)
            return getPossibleMovesForPawn(cord, boardState, previousBoardState);
        const handler = this.getMovesByPiece.get(piece.figType);
        if (!handler) {
            return [];
        }
        return handler(cord, boardState);
    }

    isCheck(boardState: IChessBoard, side: Side): boolean {
        const { board } = boardState;
        const allEnemyPieces = flattenChessboard(board).filter(
            (item): item is Piece => item !== null && item.side !== side,
        );
        const allEnemyPiecesMoves = allEnemyPieces.map((piece) => {
            return this.getPossibleMovesForPiece({ x: piece.cord.x, y: piece.cord.y }, boardState);
        });
        const king = boardState.getPieces(side, PieceType.King);
        if (!king) throw new Error('Król zbiegł z pola bitwy');
        const filteredResult = flattenChessboard(allEnemyPiecesMoves).filter(
            (item): item is CordWithMoveType => item !== null,
        );
        const result = filteredResult.some((item) => item.x === king[0].cord.x && item.y === king[0].cord.y);
        return result;
    }

    isCheckmate(boardState: IChessBoard, side: Side): boolean {
        throw new Error('Method not implemented.');
    }
    isStealemate(boardState: IChessBoard, side: Side): boolean {
        throw new Error('Method not implemented.');
    }
}
