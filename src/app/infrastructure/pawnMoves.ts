import {
    Cord,
    IChessBoard,
    CordWithMoveType,
    MoveType,
    ChessBoardRepresentation,
    PieceType,
    Piece,
    Side,
} from '../domain/basicChessTypes';
//import { IChessEngine } from '../domain/IChessEngine';

enum MoveDirection {
    LEFT = -1,
    RIGHT = 1,
    UP = 1,
    DOWN = -1,
}

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
    moveDirection: MoveDirection,
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
    moveDirection: MoveDirection,
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
    moveDirection: MoveDirection,
    currentBoardState: ChessBoardRepresentation,
    previousBoardState: ChessBoardRepresentation,
): CordWithMoveType[] {
    const result: CordWithMoveType[] = [];
    const enPassantDirections = [];
    const leftSideTile = currentBoardState[cord.y][cord.x - 1];
    const rightSideTile = currentBoardState[cord.y][cord.x + 1];

    if (leftSideTile) {
        const previousLeftSideTile =
            previousBoardState[((leftSideTile?.cord?.y as Cord['y']) - moveDirection * 2) as Cord['y']][
                leftSideTile?.cord.x as Cord['x']
            ];
        enPassantDirections.push({
            currentTile: leftSideTile,
            previousTile: previousLeftSideTile,
            sideDirection: -1,
        });
    }

    if (rightSideTile) {
        const previousRightSideTile =
            previousBoardState[((rightSideTile?.cord?.y as Cord['y']) - moveDirection * 2) as Cord['y']][
                rightSideTile?.cord.x as Cord['x']
            ];
        enPassantDirections.push({
            currentTile: rightSideTile,
            previousTile: previousRightSideTile,
            sideDirection: -1,
        });
    }
    const currentPawn = currentBoardState[cord.y][cord.x];

    if (isOutsideBoard((cord.y - moveDirection * 2) as Cord['y'])) {
        return [];
    }

    enPassantDirections.forEach((enPassantDirection) => {
        const isCurrentOppositePawn = isOppositePawn(currentPawn, enPassantDirection.currentTile);
        const ispreviousOppositePawn = isOppositePawn(currentPawn, enPassantDirection.previousTile);
        if (isCurrentOppositePawn && ispreviousOppositePawn) {
            if (isBlockedTile(enPassantDirection.currentTile)) {
                let resultY: Cord['y'] = enPassantDirection?.currentTile?.cord?.y as Cord['y'];
                resultY -= moveDirection;
                result.push({
                    x: enPassantDirection?.currentTile?.cord.x as Cord['y'],
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
    moveDirection: MoveDirection,
    currentBoardState: ChessBoardRepresentation,
): CordWithMoveType[] {
    const result: CordWithMoveType[] = [];
    if (isOutsideBoard((cord.y - moveDirection) as Cord['y'])) {
        return [];
    }

    if (!isBlockedTile(currentBoardState[cord.y - moveDirection][cord.x])) {
        result.push({ x: cord.x, y: (cord.y - moveDirection) as Cord['y'], moveType: MoveType.Promotion });
    }

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
    currentBoardComponent: IChessBoard,
    previousBoardComponent: IChessBoard,
): CordWithMoveType[] {
    const currentPiece = currentBoardComponent.board[cord.y][cord.x];
    const pieceSide = currentPiece?.side;
    const isMoved = currentPiece?.isMoved;
    const promotionRow = pieceSide === Side.Black ? 1 : 6;
    const enPassantRow = pieceSide === Side.Black ? 3 : 4;
    const moveDirection = pieceSide === Side.Black ? MoveDirection.UP : MoveDirection.DOWN;

    const singleMoveResult = possibleNormalMoves(cord, moveDirection, currentBoardComponent.board);
    const doubleMoveResult = isMoved ? [] : possibleNormalMoves(cord, moveDirection * 2, currentBoardComponent.board);

    const enPassantMoveResult =
        enPassantRow == cord.y
            ? possibleEnPassantMoves(cord, moveDirection, currentBoardComponent.board, previousBoardComponent.board)
            : [];
    const promotionMoveResult =
        promotionRow == cord.y ? possiblePromotionMoves(cord, moveDirection, currentBoardComponent.board) : [];

    let result: CordWithMoveType[] = [
        ...singleMoveResult,
        ...doubleMoveResult,
        ...enPassantMoveResult,
        ...promotionMoveResult,
    ];
    result = result.filter((el) => {
        if (el === null || el == undefined) {
            return false;
        }
        return true;
    });
    return result;
}
