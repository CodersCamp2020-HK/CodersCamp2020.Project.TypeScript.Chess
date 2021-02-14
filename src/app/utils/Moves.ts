import { Cord, CordWithMoveType, Piece } from '../domain/basicChessTypes';
import { IChessBoard } from '../domain/IChessBoard';
import {
    getKnightDirections,
    getBishopDirections,
    getKingDirections,
    getRookDirections,
    removeMovesOutsideChessBoard,
    removeMovesBlockedByPiece,
    getMoveTypesForPiece,
} from './MoveHelpers';

export function getPossibleMovesForRook(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
    const square = boardState.board[cord.x][cord.y] as Piece;
    const directions = getRookDirections(cord);
    const moves = removeMovesBlockedByPiece(cord, directions, boardState);
    const result = getMoveTypesForPiece(moves, square.side, boardState);

    return result;
}

export function getPossibleMovesForKnight(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
    const square = boardState.board[cord.x][cord.y] as Piece;
    const directions = getKnightDirections(cord);
    const moves = removeMovesOutsideChessBoard(directions);
    const result = getMoveTypesForPiece(moves, square.side, boardState);

    return result;
}

export function getPossibleMovesForBishop(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
    const square = boardState.board[cord.x][cord.y] as Piece;
    const directions = getBishopDirections(cord);
    const moves = removeMovesOutsideChessBoard(directions);
    const properMoves = removeMovesBlockedByPiece(cord, moves, boardState);
    const result = getMoveTypesForPiece(properMoves, square.side, boardState);

    return result;
}

export function getPossibleMovesForQueen(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
    return getPossibleMovesForBishop(cord, boardState).concat(getPossibleMovesForRook(cord, boardState));
}

export function getPossibleMovesForKing(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
    const square = boardState.board[cord.x][cord.y] as Piece;
    const directions = getKingDirections(cord);
    const moves = removeMovesOutsideChessBoard(directions);
    const properMoves = removeMovesBlockedByPiece(cord, moves, boardState);
    const result = getMoveTypesForPiece(properMoves, square.side, boardState);

    return result;
}
