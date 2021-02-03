import { Cord, CordWithMoveType, IChessBoard, Piece } from '../domain/basicChessTypes';
import {
    getBishopDirections,
    getKingDirections,
    getRookDirections,
    removeMovesOutsideChessBoard,
    removeMovesBlockedByPiece,
    getMoveTypesForPiece,
} from './MoveHelpers';

export function getPossibleMovesForPawn(piece: Piece, boardState: IChessBoard): CordWithMoveType[] {
    return [];
}

export function getPossibleMovesForRook(piece: Piece, boardState: IChessBoard): CordWithMoveType[] {
    const square = boardState.board[cord.x][cord.y] as Piece;
    const directions = getRookDirections(cord);
    const moves = removeMovesBlockedByPiece(cord, directions, boardState);
    const result = getMoveTypesForPiece(moves, square.side, boardState);

    return result;
}

export function getPossibleMovesForKnight(piece: Piece, boardState: IChessBoard): CordWithMoveType[] {
    return [];
}

export function getPossibleMovesForBishop(piece: Readonly<Piece>, boardState: IChessBoard): CordWithMoveType[] {
    const { cord, side } = piece;
    const directions = getBishopDirections(cord);
    const moves = removeMovesOutsideChessBoard(directions);
    const properMoves = removeMovesBlockedByPiece(cord, moves, boardState);
    const result = getMoveTypesForPiece(properMoves, side, boardState);

    return result;
}

export function getPossibleMovesForQueen(piece: Piece, boardState: IChessBoard): CordWithMoveType[] {
    return getPossibleMovesForBishop(cord, boardState).concat(getPossibleMovesForRook(cord, boardState));
}

export function getPossibleMovesForKing(piece: Piece, boardState: IChessBoard): CordWithMoveType[] {
    const square = boardState.board[cord.x][cord.y] as Piece;
    const directions = getKingDirections(cord);
    const moves = removeMovesOutsideChessBoard(directions);
    const properMoves = removeMovesBlockedByPiece(cord, moves, boardState);
    const result = getMoveTypesForPiece(properMoves, square.side, boardState);

    return result;
}
