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
    cord: { x: 6, y: 1 },
    side: Side.Black,
    isMoved: true,
};

const blockingPieceForBlack: Piece = { figType: PieceType.Pawn, cord: { x: 7, y: 1 }, side: Side.White, isMoved: true };
const whitePawnToCapture: Piece = { figType: PieceType.Pawn, cord: { x: 7, y: 0 }, side: Side.White, isMoved: false };
export const currentBoardPromotionForBlack: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, currentPawnBlack, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const currentBoardPromotionForBlackWithCapturePossible: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, currentPawnBlack, null, null, null, null, null, null],
    [whitePawnToCapture, null, null, null, null, null, null, null],
];

export const currentBoardPromotionForBlackBlockedByPiece: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, currentPawnBlack, null, null, null, null, null, null],
    [null, blockingPieceForBlack, null, null, null, null, null, null],
];
const promotionSuccesResult: CordWithMoveType = {
    x: 7,
    y: 1,
    moveType: MoveType.Promotion,
};
export const promotionForBlackResult: CordWithMoveType[] = [promotionSuccesResult];

export const promotionSuccessWithCaptureResult: CordWithMoveType = {
    x: 7,
    y: 0,
    moveType: MoveType.Promotion,
};
export const promotionBlackResultWithCapture: CordWithMoveType[] = [
    promotionSuccesResult,
    promotionSuccessWithCaptureResult,
];

//White

export const currentPawnWhite: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 1, y: 1 },
    side: Side.White,
    isMoved: true,
};
const blockingPieceForWhite: Piece = {
    figType: PieceType.Bishop,
    cord: { x: 0, y: 1 },
    side: Side.Black,
    isMoved: true,
};

export const currentBoardPromotionForWhite: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, currentPawnWhite, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

const blackPawnToCapture: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 0, y: 0 },
    side: Side.Black,
    isMoved: false,
};
const blackPawnToCapture2: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 0, y: 2 },
    side: Side.Black,
    isMoved: false,
};

export const currentBoardPromotionForWhiteWithTwoCaptures: ChessBoardRepresentation = [
    [blackPawnToCapture, blockingPieceForWhite, blackPawnToCapture2, null, null, null, null, null],
    [null, currentPawnWhite, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const currentBoardPromotionForWhiteBlockedByBlack: ChessBoardRepresentation = [
    [null, blockingPieceForWhite, null, null, null, null, null, null],
    [null, currentPawnWhite, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const promotionForWhiteResult: CordWithMoveType = {
    x: 0,
    y: 1,
    moveType: MoveType.Promotion,
};
export const promotionForWhiteResults: CordWithMoveType[] = [promotionForWhiteResult];

export const promotionForWhiteCaptureResult: CordWithMoveType = {
    x: 0,
    y: 0,
    moveType: MoveType.Promotion,
};
export const promotionForWhiteCapture2Result: CordWithMoveType = {
    x: 0,
    y: 2,
    moveType: MoveType.Promotion,
};
export const promotionWhiteResultBlockedByTwoCaptures: CordWithMoveType[] = [
    promotionForWhiteCaptureResult,
    promotionForWhiteCapture2Result,
];
