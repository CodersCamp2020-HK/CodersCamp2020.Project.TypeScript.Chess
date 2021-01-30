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
export const blockingPiece: Piece = { figType: PieceType.Rook, cord: { x: 1, y: 2 }, side: Side.White, isMoved: true };
export const blockingPiece2: Piece = { figType: PieceType.Pawn, cord: { x: 3, y: 2 }, side: Side.White, isMoved: true };
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
export const el1: CordWithMoveType = {
    x: 1,
    y: 2,
    moveType: MoveType.Capture,
};
export const el2: CordWithMoveType = {
    x: 3,
    y: 2,
    moveType: MoveType.Capture,
};
export const captureBlackResult: CordWithMoveType[] = [el1, el2];

//White

export const currentPawnWhite: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 3, y: 4 },
    side: Side.White,
    isMoved: true,
};

export const blockingPiece3: Piece = { figType: PieceType.Pawn, cord: { x: 2, y: 5 }, side: Side.Black, isMoved: true };
export const blockingPiece4: Piece = {
    figType: PieceType.Knight,
    cord: { x: 4, y: 5 },
    side: Side.Black,
    isMoved: true,
};

export const currentBoardMoveWhite: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, currentPawnWhite, null, null, null, null],
    [null, null, blockingPiece3, null, blockingPiece4, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const el3: CordWithMoveType = {
    x: 2,
    y: 5,
    moveType: MoveType.Capture,
};
export const el4: CordWithMoveType = {
    x: 4,
    y: 5,
    moveType: MoveType.Capture,
};
export const captureWhiteResult: CordWithMoveType[] = [el3, el4];
