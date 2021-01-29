import {
    Cord,
    IChessBoard,
    CordWithMoveType,
    MoveType,
    ChessBoardRepresentation,
    PieceType,
} from '../domain/basicChessTypes';
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
    {
        if (cord.y - moveDirection > 7 || cord.y - moveDirection < 0) {
            return [];
        }
        //check is blocked
        if (currentBoardState[cord.y - moveDirection * 2][cord.x] != null) {
            return [];
        }
        const resultCordY = (cord.y - moveDirection * 2) as Cord['y'];
        const result: CordWithMoveType[] = [{ x: 1, y: resultCordY, moveType: MoveType.NormalMove }];
        return result;
    }
}
export function getCapture(
    cord: Cord,
    moveDirection: number,
    currentBoardState: ChessBoardRepresentation,
): CordWithMoveType[] {
    const result: CordWithMoveType[] = [];
    const leftCorner = currentBoardState[cord.y - moveDirection][cord.x - 1];
    const rightCorner = currentBoardState[cord.y - moveDirection][cord.x + 1];
    const currentPawn = currentBoardState[cord.y][cord.x];
    if (cord.y - moveDirection > 7 || cord.y - moveDirection < 0) {
        return result;
    }
    if (leftCorner != null && leftCorner != undefined && leftCorner.side != currentPawn?.side) {
        result.push({
            x: leftCorner.cord.x,
            y: leftCorner.cord.y,
            moveType: MoveType.Capture,
        });
    }
    if (rightCorner != null && rightCorner != undefined && rightCorner.side != currentPawn?.side) {
        result.push({
            x: rightCorner.cord.x,
            y: rightCorner.cord.y,
            moveType: MoveType.Capture,
        });
    }
    return result;
}
export function getPassant(
    cord: Cord,
    moveDirection: number,
    currentBoardState: ChessBoardRepresentation,
    previousBoardState: ChessBoardRepresentation,
): CordWithMoveType[] {
    const result: CordWithMoveType[] = [];
    const leftSide = currentBoardState[cord.y - moveDirection][cord.x - 1];
    const rightSide = currentBoardState[cord.y - moveDirection][cord.x + 1];
    const currentPawn = currentBoardState[cord.y][cord.x];

    if (
        previousBoardState[cord.y - moveDirection * 2][cord.x - 1]?.figType == PieceType.Pawn &&
        previousBoardState[cord.y - moveDirection * 2][cord.x - 1]?.side != currentPawn?.side
    ) {
        if (rightSide != null && rightSide != undefined && rightSide.side != currentPawn?.side) {
            result.push({
                x: rightCorner.cord.x,
                y: rightCorner.cord.y,
                moveType: MoveType.Capture,
            });
        }
    }

    if (
        previousBoardState[cord.y - moveDirection * 2][cord.x + 1]?.figType == PieceType.Pawn &&
        previousBoardState[cord.y - moveDirection * 2][cord.x + 1]?.side != currentPawn?.side
    ) {
        if (leftSide != null && leftSide != undefined && leftSide.side != currentPawn?.side) {
            result.push({
                x: rightCorner.cord.x,
                y: rightCorner.cord.y,
                moveType: MoveType.Capture,
            });
        }
    }
}
export function getPromotion(
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
    const result: CordWithMoveType[] = [{ x: 1, y: resultCordY, moveType: MoveType.Promotion }];
    return result;
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
