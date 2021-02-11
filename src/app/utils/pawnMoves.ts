import { Cord, CordWithMoveType, MoveType, PieceType, Piece, Side } from '../domain/basicChessTypes';
import { ChessBoardView, IChessBoard } from '../domain/IChessBoard';
//import { IChessEngine } from '../domain/IChessEngine';

enum MoveDirection {
    LEFT = -1,
    RIGHT = 1,
    UP = 1,
    DOWN = -1,
}

function isOutsideBoard(cord: Cord['x'] | Cord['y']): boolean {
    return cord > 7 || cord < 0 ? true : false;
}

function isBlockedTile(tile: Piece | null): boolean {
    return tile !== null ? true : false;
}

function isOppositePawn(currentPawn: Piece | null, pieceToComparison: Piece | null): boolean {
    return pieceToComparison?.figType == PieceType.Pawn && pieceToComparison.side != currentPawn?.side ? true : false;
}

export function possibleNormalMoves(
    cord: Cord,
    moveDirection: MoveDirection,
    currentBoardState: ChessBoardView,
): CordWithMoveType[] {
    if (isOutsideBoard((cord.x - moveDirection) as Cord['x'])) {
        return [];
    }

    if (isBlockedTile(currentBoardState[cord.x - moveDirection][cord.y])) {
        return [];
    }

    const result: CordWithMoveType[] = [
        { x: (cord.x - moveDirection) as Cord['x'], y: cord.y, moveType: MoveType.NormalMove },
    ];
    return result;
}

export function possibleCaptureMoves(
    cord: Cord,
    moveDirection: MoveDirection,
    currentBoardState: ChessBoardView,
): CordWithMoveType[] {
    const result: CordWithMoveType[] = [];

    const leftCorner = currentBoardState[cord.x - moveDirection][cord.y - 1];
    const rightCorner = currentBoardState[cord.x - moveDirection][cord.y + 1];
    const currentPawn = currentBoardState[cord.x][cord.y];

    if (isOutsideBoard((cord.x - moveDirection) as Cord['x'])) {
        return [];
    }

    const captureDirections = [];
    if (leftCorner) {
        captureDirections.push(leftCorner);
    }

    if (rightCorner) {
        captureDirections.push(rightCorner);
    }

    captureDirections.forEach((currentDirection) => {
        if (isBlockedTile(currentDirection) && currentDirection.side != currentPawn?.side) {
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
    currentBoardState: ChessBoardView,
    previousBoardState: ChessBoardView,
): CordWithMoveType[] {
    const result: CordWithMoveType[] = [];
    const enPassantDirections = [];
    const leftSideTile = currentBoardState[cord.x][cord.y - 1];
    const rightSideTile = currentBoardState[cord.x][cord.y + 1];

    if (leftSideTile) {
        const previousLeftSideTile =
            previousBoardState[((leftSideTile?.cord?.x as Cord['x']) - moveDirection * 2) as Cord['x']][
                leftSideTile?.cord.y as Cord['y']
            ];
        enPassantDirections.push({
            currentTile: leftSideTile,
            previousTile: previousLeftSideTile,
            sideDirection: -1,
        });
    }

    if (rightSideTile) {
        const previousRightSideTile =
            previousBoardState[((rightSideTile?.cord?.x as Cord['x']) - moveDirection * 2) as Cord['x']][
                rightSideTile?.cord.y as Cord['y']
            ];
        enPassantDirections.push({
            currentTile: rightSideTile,
            previousTile: previousRightSideTile,
            sideDirection: -1,
        });
    }
    const currentPawn = currentBoardState[cord.x][cord.y];

    if (isOutsideBoard((cord.x - moveDirection * 2) as Cord['x'])) {
        return [];
    }

    enPassantDirections.forEach((enPassantDirection) => {
        const isCurrentOppositePawn = isOppositePawn(currentPawn, enPassantDirection.currentTile);
        const ispreviousOppositePawn = isOppositePawn(currentPawn, enPassantDirection.previousTile);
        if (isCurrentOppositePawn && ispreviousOppositePawn) {
            if (isBlockedTile(enPassantDirection.currentTile)) {
                let resultX: Cord['x'] = enPassantDirection?.currentTile?.cord?.x as Cord['x'];
                resultX -= moveDirection;
                result.push({
                    x: resultX as Cord['x'],
                    y: enPassantDirection?.currentTile?.cord.y as Cord['y'],
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
    currentBoardState: ChessBoardView,
): CordWithMoveType[] {
    const result: CordWithMoveType[] = [];
    if (isOutsideBoard((cord.x - moveDirection) as Cord['x'])) {
        return [];
    }

    if (!isBlockedTile(currentBoardState[cord.x - moveDirection][cord.y])) {
        result.push({ x: (cord.x - moveDirection) as Cord['x'], y: cord.y, moveType: MoveType.Promotion });
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
    const currentPiece = currentBoardComponent.board[cord.x][cord.y];
    const pieceSide = currentPiece?.side;
    const isMoved = currentPiece?.isMoved;
    const promotionRow = pieceSide === Side.White ? 1 : 6;
    const enPassantRow = pieceSide === Side.White ? 3 : 4;
    const moveDirection = pieceSide === Side.White ? MoveDirection.UP : MoveDirection.DOWN;

    const singleMoveResult = possibleNormalMoves(cord, moveDirection, currentBoardComponent.board);
    const doubleMoveResult = isMoved ? [] : possibleNormalMoves(cord, moveDirection * 2, currentBoardComponent.board);
    const captureResult = possibleCaptureMoves(cord, moveDirection, currentBoardComponent.board);

    const enPassantMoveResult =
        enPassantRow == cord.x
            ? possibleEnPassantMoves(cord, moveDirection, currentBoardComponent.board, previousBoardComponent.board)
            : [];
    const promotionMoveResult =
        promotionRow == cord.x ? possiblePromotionMoves(cord, moveDirection, currentBoardComponent.board) : [];

    const result: CordWithMoveType[] = [
        ...singleMoveResult,
        ...doubleMoveResult,
        ...captureResult,
        ...enPassantMoveResult,
        ...promotionMoveResult,
    ];
    return result.filter((el) => (el === null ? false : true));
}
