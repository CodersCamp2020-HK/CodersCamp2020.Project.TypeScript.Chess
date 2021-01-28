import { Cord, IChessBoard, CordWithMoveType, MoveType, ChessBoardRepresentation } from '../domain/basicChessTypes';
//import { IChessEngine } from '../domain/IChessEngine';

export function getNormalMove(
    cord: Cord,
    moveDirection: number,
    currentBoardState: ChessBoardRepresentation,
): CordWithMoveType[] {
    return [];
}
export function getDoubleMove(
    cord: Cord,
    moveDirection: number,
    currentBoardState: ChessBoardRepresentation,
): CordWithMoveType[] {
    return [];
}
export function getCapture(
    cord: Cord,
    moveDirection: number,
    currentBoardState: ChessBoardRepresentation,
): CordWithMoveType[] {
    return [];
}
export function getPassant(
    cord: Cord,
    moveDirection: number,
    currentBoardState: ChessBoardRepresentation,
): CordWithMoveType[] {
    return [];
}
export function getPromotion(
    cord: Cord,
    moveDirection: number,
    currentBoardState: ChessBoardRepresentation,
): CordWithMoveType[] {
    return [];
}

export function getPossibleMovesForPawn(
    cord: Cord,
    currentBoardState: IChessBoard,
    previousBoardState: IChessBoard,
): CordWithMoveType[] {
    let pieceSide;
    let isMoved;
    let promotionRow;
    let passantRow;
    //1up -1down
    let moveDirection;

    const result: CordWithMoveType = {
        x: cord.x,
        y: cord.y,
        moveType: MoveType.NormalMove,
    };
    return [result];
}
