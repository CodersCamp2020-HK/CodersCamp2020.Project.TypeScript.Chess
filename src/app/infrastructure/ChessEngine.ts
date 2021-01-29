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

function getPossibleMovesForPawn(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
    return [];
}

function getPossibleMovesForRook(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
    const square = boardState.board[cord.x][cord.y] as Piece;
    const directions = getRookDirections(cord);
    const moves = removeMovesBlockedByPiece(cord, directions, boardState);
    const result = getMoveTypesForPiece(moves, square.side, boardState);

    return result;
}

function getPossibleMovesForKnight(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
    return [];
}

function getPossibleMovesForBishop(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
    const square = boardState.board[cord.x][cord.y] as Piece;
    const directions = getBishopDirections(cord);
    const moves = removeMovesOutsideChessBoard(directions);
    const properMoves = removeMovesBlockedByPiece(cord, moves, boardState);
    const result = getMoveTypesForPiece(properMoves, square.side, boardState);

    return result;
}

function getPossibleMovesForQueen(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
    return getPossibleMovesForBishop(cord, boardState).concat(getPossibleMovesForRook(cord, boardState));
}

function getPossibleMovesForKing(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
    const square = boardState.board[cord.x][cord.y] as Piece;
    const directions = getKingDirections(cord);
    const moves = removeMovesOutsideChessBoard(directions);
    const properMoves = removeMovesBlockedByPiece(cord, moves, boardState);
    const result = getMoveTypesForPiece(properMoves, square.side, boardState);

    return result;
}
