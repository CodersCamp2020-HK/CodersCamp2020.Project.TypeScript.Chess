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
    cord: { x: 1, y: 1 },
    side: Side.Black,
    isMoved: true,
};
export const blockingPiece: Piece = { figType: PieceType.Pawn, cord: { x: 1, y: 0 }, side: Side.White, isMoved: true };
export const pawnToCapture: Piece = { figType: PieceType.Pawn, cord: { x: 2, y: 0 }, side: Side.White, isMoved: false };
export const currentBoardPromotionBlack: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, currentPawnBlack, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const currentBoardPromotionBlackWithCapture: ChessBoardRepresentation = [
    [null, null, pawnToCapture, null, null, null, null, null],
    [null, currentPawnBlack, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const currentBoardPromotionBlackBlocked: ChessBoardRepresentation = [
    [null, blockingPiece, null, null, null, null, null, null],
    [null, currentPawnBlack, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
export const el1: CordWithMoveType = {
    x: 1,
    y: 0,
    moveType: MoveType.Promotion,
};
export const promotionBlackResult: CordWithMoveType[] = [el1];

export const el1WithCapture: CordWithMoveType = {
    x: 2,
    y: 0,
    moveType: MoveType.Promotion,
};
export const promotionBlackResultWithCapture: CordWithMoveType[] = [el1, el1WithCapture];

//White

export const pawnWhite: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 1, y: 6 },
    side: Side.White,
    isMoved: true,
};
export const blockingPieceWhite: Piece = {
    figType: PieceType.Bishop,
    cord: { x: 1, y: 7 },
    side: Side.Black,
    isMoved: true,
};

export const currentBoardMoveWhite: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, pawnWhite, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const pawnToCapture1: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 0, y: 7 },
    side: Side.Black,
    isMoved: false,
};
export const pawnToCapture2: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 2, y: 7 },
    side: Side.Black,
    isMoved: false,
};

export const currentBoardMoveWhiteWithTwoCaptures: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, pawnWhite, null, null, null, null, null, null],
    [pawnToCapture1, blockingPieceWhite, pawnToCapture2, null, null, null, null, null],
];

export const currentBoardMoveWhiteBlocked: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, pawnWhite, null, null, null, null, null, null],
    [null, blockingPieceWhite, null, null, null, null, null, null],
];

export const el2: CordWithMoveType = {
    x: 1,
    y: 7,
    moveType: MoveType.Promotion,
};
export const promotionWhiteResult: CordWithMoveType[] = [el2];

export const el1Capture: CordWithMoveType = {
    x: 0,
    y: 7,
    moveType: MoveType.Promotion,
};
export const el2Capture: CordWithMoveType = {
    x: 2,
    y: 7,
    moveType: MoveType.Promotion,
};
export const promotionWhiteResultBlockedTwoCaptures: CordWithMoveType[] = [el1Capture, el2Capture];
