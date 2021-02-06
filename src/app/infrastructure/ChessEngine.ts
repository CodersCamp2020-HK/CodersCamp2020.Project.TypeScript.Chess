import {Piece, PieceType, Cord, IChessBoard, CordWithMoveType, Side } from '../domain/basicChessTypes';
import { IChessEngine } from '../domain/IChessEngine';
import {
    getPossibleMovesForBishop,
    getPossibleMovesForKing,
    getPossibleMovesForKnight,
    getPossibleMovesForPawn,
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
            [PieceType.Pawn, getPossibleMovesForPawn],
            [PieceType.Queen, getPossibleMovesForQueen],
            [PieceType.Rook, getPossibleMovesForRook],
        ]);
    }

    getPossibleMovesForPiece(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        const piece = boardState.board[cord.x][cord.y];
        if (!piece) {
            return [];
        }
        const handler = this.getMovesByPiece.get(piece.figType);
        if (!handler) {
            return [];
        }
        return handler(cord, boardState);
    }

    isCheck(boardState: IChessBoard, side: Side): boolean  {
        const { board } = boardState;
        const allEnemyPieces = _.flattenDeep(board).filter((item) => item !== null && item.side !== side);
        const allEnemyPiecesMoves = allEnemyPieces.map((piece) => {
            const PIECE = piece as Piece;
            return this.getPossibleMovesForPiece({ x: PIECE.cord.x, y: PIECE.cord.y }, boardState);
        });
        const king = _.flattenDeep(board).find(
            (item) => item !== null && item.side === side && item.figType === PieceType.King,
        ) as Piece;
        const result = _.flattenDeep(allEnemyPiecesMoves).some((item) => item.x === king.cord.x && item.y === king.cord.y);
        return result;
    };
    isCheckmate(boardState: IChessBoard, side: Side): boolean {
        throw new Error('Method not implemented.');
    }
    isStealemate(boardState: IChessBoard, side: Side): boolean {
        throw new Error('Method not implemented.');
    }
}
