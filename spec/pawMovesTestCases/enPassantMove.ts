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
    cord: { x: 4, y: 2 },
    side: Side.Black,
    isMoved: true,
};
const blockingPiece: Piece = { figType: PieceType.Pawn, cord: { x: 4, y: 1 }, side: Side.White, isMoved: true };
const blockingPiece2: Piece = { figType: PieceType.Pawn, cord: { x: 4, y: 3 }, side: Side.White, isMoved: true };
export const currentBoardPassantForBlack: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, blockingPiece, currentPawnBlack, blockingPiece2, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

const blockingPieceBefore: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 6, y: 1 },
    side: Side.White,
    isMoved: false,
};
const blockingPiece2Before: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 6, y: 3 },
    side: Side.White,
    isMoved: false,
};
export const previousBoardPassantForBlack: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, currentPawnBlack, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, blockingPieceBefore, null, blockingPiece2Before, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
const passantResultForBlack: CordWithMoveType = {
    x: 5,
    y: 1,
    moveType: MoveType.EnPassant,
};
const passantResult2ForBlack: CordWithMoveType = {
    x: 5,
    y: 3,
    moveType: MoveType.EnPassant,
};
export const passantForBlackResult: CordWithMoveType[] = [passantResultForBlack, passantResult2ForBlack];

//White

export const currentPawnWhite: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 3, y: 3 },
    side: Side.White,
    isMoved: true,
};

const blockingPieceForWhite: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 3, y: 2 },
    side: Side.Black,
    isMoved: true,
};
const blockingPiece2ForWhite: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 3, y: 4 },
    side: Side.Black,
    isMoved: true,
};

export const currentBoardPassantForWhite: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, blockingPieceForWhite, currentPawnWhite, blockingPiece2ForWhite, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const blockingPiece3Before: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 1, y: 2 },
    side: Side.Black,
    isMoved: false,
};
export const blockingPiece4Before: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 1, y: 4 },
    side: Side.Black,
    isMoved: false,
};

export const previousBoardMoveWhite: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, blockingPiece3Before, null, blockingPiece4Before, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, currentPawnWhite, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

const passantForWhiteResult: CordWithMoveType = {
    x: 2,
    y: 2,
    moveType: MoveType.EnPassant,
};
const passantForWhiteResult2: CordWithMoveType = {
    x: 2,
    y: 4,
    moveType: MoveType.EnPassant,
};
export const passantForWhiteResults: CordWithMoveType[] = [passantForWhiteResult, passantForWhiteResult2];

export const pawnWhiteBySide: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 3, y: 0 },
    side: Side.White,
    isMoved: true,
};
const blockingPieceOneSide: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 3, y: 1 },
    side: Side.Black,
    isMoved: true,
};
export const currentBoardMoveWhiteOneSide: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [pawnWhiteBySide, blockingPieceOneSide, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

const blockingPieceOneSideBefore: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 1, y: 1 },
    side: Side.Black,
    isMoved: false,
};
export const previousBoardMoveWhiteOneSide: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, blockingPieceOneSideBefore, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [pawnWhiteBySide, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

const passantForWhiteOneSideResult: CordWithMoveType = {
    x: 2,
    y: 1,
    moveType: MoveType.EnPassant,
};

export const passantWhiteResultOneSide: CordWithMoveType[] = [passantForWhiteOneSideResult];
