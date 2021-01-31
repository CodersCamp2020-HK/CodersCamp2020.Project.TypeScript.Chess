import {
    Cord,
    IChessBoard,
    CordWithMoveType,
    MoveType,
    ChessBoardRepresentation,
    PieceType,
    Piece,
} from '../domain/basicChessTypes';
//import { IChessEngine } from '../domain/IChessEngine';

function isOutsideBoard(cord: Cord['x'] | Cord['y']): boolean {
    if (cord > 7 || cord < 0) {
        return true;
    }
    return false;
}

function isBlockedTile(tile: Piece | null): boolean {
    if (tile != null && tile != undefined) {
        return true;
    }
    return false;
}

function isOppositePawn(currentPawn: Piece | null, pieceToComparison: Piece | null): boolean {
    if (currentPawn === null || pieceToComparison == null) {
        return false;
    }
    if (pieceToComparison.figType == PieceType.Pawn && pieceToComparison.side != currentPawn.side) {
        return true;
    }
    return false;
}

export function possibleNormalMoves(
    cord: Cord,
    moveDirection: number,
    currentBoardState: ChessBoardRepresentation,
): CordWithMoveType[] {
    if (isOutsideBoard((cord.y - moveDirection) as Cord['y'])) {
        return [];
    }

    if (isBlockedTile(currentBoardState[cord.y - moveDirection][cord.x])) {
        return [];
    }

    const result: CordWithMoveType[] = [
        { x: cord.x, y: (cord.y - moveDirection) as Cord['y'], moveType: MoveType.NormalMove },
    ];
    return result;
}

export function possibleCaptureMoves(
    cord: Cord,
    moveDirection: number,
    currentBoardState: ChessBoardRepresentation,
): CordWithMoveType[] {
    const result: CordWithMoveType[] = [];

    const leftCorner = currentBoardState[cord.y - moveDirection][cord.x - 1];
    const rightCorner = currentBoardState[cord.y - moveDirection][cord.x + 1];
    const currentPawn = currentBoardState[cord.y][cord.x];

    if (isOutsideBoard((cord.y - moveDirection) as Cord['y'])) {
        return [];
    }

    const captureDirections = [leftCorner, rightCorner];
    captureDirections.forEach((currentDirection) => {
        if (isBlockedTile(currentDirection) && currentDirection?.side != currentPawn?.side) {
            result.push({
                x: currentDirection?.cord.x as Cord['x'],
                y: currentDirection?.cord.y as Cord['y'],
                moveType: MoveType.Capture,
            });
        }
    });

    return result;
}
export function possibleEnPassantMoves(
    cord: Cord,
    moveDirection: number,
    currentBoardState: ChessBoardRepresentation,
    previousBoardState: ChessBoardRepresentation,
): CordWithMoveType[] {
    const result: CordWithMoveType[] = [];
    const leftSideTile = currentBoardState[cord.y][cord.x - 1];
    const rightSideTile = currentBoardState[cord.y][cord.x + 1];
    const currentPawn = currentBoardState[cord.y][cord.x];

    const enPassantDirections = [
        {
            tile: leftSideTile,
            sideDirection: -1,
        },
        {
            tile: rightSideTile,
            sideDirection: 1,
        },
    ];

    if (isOutsideBoard((cord.y - moveDirection * 2) as Cord['y'])) {
        return [];
    }

    // if (isOutsideBoard((cord.x - 1) as Cord['x']) || isOutsideBoard((cord.x + 1) as Cord['x'])) {
    //     return [];
    // }

    enPassantDirections.forEach((enPassantDirection) => {
        if (isOppositePawn(currentPawn, enPassantDirection.tile)) {
            if (isBlockedTile(enPassantDirection.tile)) {
                let resultY: Cord['y'] = enPassantDirection?.tile?.cord?.y as Cord['y'];
                resultY -= moveDirection;
                result.push({
                    x: enPassantDirection?.tile?.cord.x as Cord['y'],
                    y: resultY as Cord['y'],
                    moveType: MoveType.EnPassant,
                });
            }
        }
    });
    return result;
}
export function possiblePromotionMoves(
    cord: Cord,
    moveDirection: number,
    currentBoardState: ChessBoardRepresentation,
): CordWithMoveType[] {
    const result: CordWithMoveType[] = [];
    if (isOutsideBoard((cord.y - moveDirection) as Cord['y'])) {
        return [];
    }

    if (isBlockedTile(currentBoardState[cord.y - moveDirection][cord.x])) {
        return [];
    }

    result.push({ x: 1, y: (cord.y - moveDirection) as Cord['y'], moveType: MoveType.Promotion });

    const captureResults = possibleCaptureMoves(cord, moveDirection, currentBoardState);
    if (captureResults.length > 0) {
        captureResults.forEach((captureResult) => {
            const tempResult = { ...captureResult };
            tempResult.moveType = MoveType.Promotion;
            result.push(tempResult);
        });
    }

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
