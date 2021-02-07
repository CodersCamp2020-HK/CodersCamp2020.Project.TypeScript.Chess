import { CordWithMoveType, MoveType, PieceType, Side, Piece } from '../../src/app/domain/basicChessTypes';
import { ChessBoardView } from '../../src/app/domain/IChessBoard';
export const currentPawnBlack: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 2, y: 2 },
    side: Side.Black,
    isMoved: false,
};
const blockingPiece: Piece = { figType: PieceType.Rook, cord: { x: 3, y: 1 }, side: Side.White, isMoved: true };
const blockingPiece2: Piece = { figType: PieceType.Pawn, cord: { x: 3, y: 3 }, side: Side.White, isMoved: true };
export const currentBoardCaptureBlack: ChessBoardView = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, currentPawnBlack, null, null, null, null, null],
    [null, blockingPiece, null, blockingPiece2, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
export const captureForBlackResult: CordWithMoveType = {
    x: 3,
    y: 1,
    moveType: MoveType.Capture,
};
export const captureForBlackResult2: CordWithMoveType = {
    x: 3,
    y: 3,
    moveType: MoveType.Capture,
};
export const captureBlackResults: CordWithMoveType[] = [captureForBlackResult, captureForBlackResult2];

//White

export const currentPawnWhite: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 5, y: 3 },
    side: Side.White,
    isMoved: true,
};

const blockingPiece3: Piece = { figType: PieceType.Pawn, cord: { x: 4, y: 2 }, side: Side.Black, isMoved: true };
const blockingPiece4: Piece = {
    figType: PieceType.Knight,
    cord: { x: 4, y: 4 },
    side: Side.Black,
    isMoved: true,
};

export const currentBoardCaptureForWhite: ChessBoardView = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, blockingPiece3, null, blockingPiece4, null, null, null],
    [null, null, null, currentPawnWhite, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const captureForWhiteResult: CordWithMoveType = {
    x: 4,
    y: 2,
    moveType: MoveType.Capture,
};
export const captureForWhiteResult2: CordWithMoveType = {
    x: 4,
    y: 4,
    moveType: MoveType.Capture,
};
export const captureWhiteResults: CordWithMoveType[] = [captureForWhiteResult, captureForWhiteResult2];

const blockingPieceOneSide: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 4, y: 6 },
    side: Side.Black,
    isMoved: true,
};
export const currentPawnWhiteOneSide: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 5, y: 7 },
    side: Side.White,
    isMoved: true,
};
export const currentBoardMoveWhiteOneSide: ChessBoardView = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, blockingPieceOneSide, null],
    [null, null, null, null, null, null, null, currentPawnWhiteOneSide],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const captureBlockedOneSideResult: CordWithMoveType = {
    x: 4,
    y: 6,
    moveType: MoveType.Capture,
};

export const captureWhiteBlockedByOneSideResults: CordWithMoveType[] = [captureBlockedOneSideResult];
