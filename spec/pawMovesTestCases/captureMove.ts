import {
    CordWithMoveType,
    MoveType,
    ChessBoardRepresentation,
    PieceType,
    Side,
    Piece,
} from '../../src/app/domain/basicChessTypes';
export const currentPawnBlack: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 2, y: 3 },
    side: Side.Black,
    isMoved: true,
};
const blockingPiece: Piece = { figType: PieceType.Rook, cord: { x: 1, y: 2 }, side: Side.White, isMoved: true };
const blockingPiece2: Piece = { figType: PieceType.Pawn, cord: { x: 3, y: 2 }, side: Side.White, isMoved: true };
export const currentBoardCaptureBlack: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, blockingPiece, null, blockingPiece2, null, null, null, null],
    [null, null, currentPawnBlack, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
export const captureForBlackResult: CordWithMoveType = {
    x: 1,
    y: 2,
    moveType: MoveType.Capture,
};
export const captureForBlackResult2: CordWithMoveType = {
    x: 3,
    y: 2,
    moveType: MoveType.Capture,
};
export const captureBlackResults: CordWithMoveType[] = [captureForBlackResult, captureForBlackResult2];

//White

export const currentPawnWhite: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 3, y: 4 },
    side: Side.White,
    isMoved: true,
};

const blockingPiece3: Piece = { figType: PieceType.Pawn, cord: { x: 2, y: 5 }, side: Side.Black, isMoved: true };
const blockingPiece4: Piece = {
    figType: PieceType.Knight,
    cord: { x: 4, y: 5 },
    side: Side.Black,
    isMoved: true,
};

export const currentBoardCaptureForWhite: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, currentPawnWhite, null, null, null, null],
    [null, null, blockingPiece3, null, blockingPiece4, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const captureForWhiteResult: CordWithMoveType = {
    x: 2,
    y: 5,
    moveType: MoveType.Capture,
};
export const captureForWhiteResult2: CordWithMoveType = {
    x: 4,
    y: 5,
    moveType: MoveType.Capture,
};
export const captureWhiteResults: CordWithMoveType[] = [captureForWhiteResult, captureForWhiteResult2];

const blockingPieceOneSide: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 6, y: 5 },
    side: Side.Black,
    isMoved: true,
};
export const currentPawnWhiteOneSide: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 7, y: 4 },
    side: Side.White,
    isMoved: true,
};
export const currentBoardMoveWhiteOneSide: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, currentPawnWhiteOneSide],
    [null, null, null, null, null, null, blockingPieceOneSide, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const captureBlockedOneSideResult: CordWithMoveType = {
    x: 6,
    y: 5,
    moveType: MoveType.Capture,
};

export const captureWhiteBlockedByOneSideResults: CordWithMoveType[] = [captureBlockedOneSideResult];
