import { Cord, IChessBoard, CordWithMoveType, MoveType, ChessBoardRepresentation } from '../domain/basicChessTypes';
//import { IChessEngine } from '../domain/IChessEngine';

export function getSingleMove(
    cord: Cord,
    moveDirection: number,
    currentBoardState: ChessBoardRepresentation,
): CordWithMoveType[] {
    if (cord.y - moveDirection > 7 || cord.y - moveDirection < 0) {
        return [];
    }
    //check is blocked
    if (currentBoardState[cord.y - moveDirection][cord.x] != null) {
        return [];
    }
    const resultCordY = (cord.y - moveDirection) as Cord['y'];
    const result: CordWithMoveType[] = [{ x: 1, y: resultCordY, moveType: MoveType.NormalMove }];
    return result;
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
