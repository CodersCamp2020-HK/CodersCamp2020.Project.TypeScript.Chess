import { CordWithMoveType, MoveType, PieceType, Side, Piece } from '../../src/app/domain/basicChessTypes';
import { ChessBoardView } from '../../src/app/domain/IChessBoard';
export const currentPawnBlack: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 1, y: 1 },
    side: Side.Black,
    isMoved: false,
};
const blockingPiece: Piece = { figType: PieceType.Pawn, cord: { x: 3, y: 1 }, side: Side.Black, isMoved: true };
export const currentBoardMoveForBlack: ChessBoardView = [
    [null, null, null, null, null, null, null, null],
    [null, currentPawnBlack, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
export const currentBoardMoveBlackBlocked: ChessBoardView = [
    [null, null, null, null, null, null, null, null],
    [null, currentPawnBlack, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, blockingPiece, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
export const moveForBlackResult: CordWithMoveType = {
    x: 3,
    y: 1,
    moveType: MoveType.NormalMove,
};
export const moveForBlackResults: CordWithMoveType[] = [moveForBlackResult];

//White

export const currentPawnWhite: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 6, y: 1 },
    side: Side.White,
    isMoved: false,
};
const blockingPieceForWhite: Piece = {
    figType: PieceType.Bishop,
    cord: { x: 4, y: 1 },
    side: Side.Black,
    isMoved: true,
};

export const currentBoardMoveForWhite: ChessBoardView = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, currentPawnWhite, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const currentBoardMoveForWhiteBlocked: ChessBoardView = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, blockingPieceForWhite, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, currentPawnWhite, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const moveForWhiteResult: CordWithMoveType = {
    x: 4,
    y: 1,
    moveType: MoveType.NormalMove,
};
export const moveForWhiteResults: CordWithMoveType[] = [moveForWhiteResult];
