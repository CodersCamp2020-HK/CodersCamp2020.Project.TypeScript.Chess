import { PieceType, Cord, IChessBoard, CordWithMoveType, Side, Piece } from '../domain/basicChessTypes';
import { IChessEngine } from '../domain/IChessEngine';
import {
    getBishopDirections,
    getKingDirections,
    getRookDirections,
    removeMovesOutsideChessBoard,
    removeMovesBlockedByPiece,
    getMoveTypesForPiece,
} from '../utils/Moves';

export class ChessEngine implements IChessEngine {
    getMovesByPiece: Map<PieceType, (cord: Cord, boardState: IChessBoard) => CordWithMoveType[]>;

    constructor() {
        this.getMovesByPiece = new Map([
            [PieceType.Bishop, this.getPossibleMovesForBishop],
            [PieceType.King, this.getPossibleMovesForKnight],
            [PieceType.Knight, this.getPossibleMovesForKnight],
            [PieceType.Pawn, this.getPossibleMovesForPawn],
            [PieceType.Queen, this.getPossibleMovesForQueen],
            [PieceType.Rook, this.getPossibleMovesForRook],
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

    getPossibleMovesForPawn(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        return [];
    }
    getPossibleMovesForRook(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        const square = boardState.board[cord.x][cord.y] as Piece;
        const directions = getRookDirections(cord);
        const moves = removeMovesBlockedByPiece(cord, directions, boardState);
        const result = getMoveTypesForPiece(moves, square.side, boardState);

        return result;
    }

    getPossibleMovesForKnight(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        return [];
    }

    getPossibleMovesForBishop(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        const square = boardState.board[cord.x][cord.y] as Piece;
        const allMoves = getBishopDirections(cord);
        const properCords = removeMovesOutsideChessBoard(allMoves);
        const moves = removeMovesBlockedByPiece(cord, properCords, boardState);
        const result = getMoveTypesForPiece(moves, square.side, boardState);

        return result;
    }

    getPossibleMovesForQueen(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        return this.getPossibleMovesForBishop(cord, boardState).concat(this.getPossibleMovesForRook(cord, boardState));
    }

    getPossibleMovesForKing(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        const square = boardState.board[cord.x][cord.y] as Piece;
        const possibleMoves = getKingDirections(cord);
        const properMoves = removeMovesOutsideChessBoard(possibleMoves);
        const moves = removeMovesBlockedByPiece(cord, properMoves, boardState);
        const result = getMoveTypesForPiece(moves, square.side, boardState);

        return result;
    }

    isCheck(boardState: IChessBoard, side: Side): boolean {
        throw new Error('Method not implemented.');
    }
    isCheckmate(boardState: IChessBoard, side: Side): boolean {
        throw new Error('Method not implemented.');
    }
    isStealemate(boardState: IChessBoard, side: Side): boolean {
        throw new Error('Method not implemented.');
    }
}
