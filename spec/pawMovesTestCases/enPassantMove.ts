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
export const blockingPiece: Piece = { figType: PieceType.Pawn, cord: { x: 1, y: 3 }, side: Side.White, isMoved: true };
export const blockingPiece2: Piece = { figType: PieceType.Pawn, cord: { x: 3, y: 3 }, side: Side.White, isMoved: true };
export const currentBoardPassantBlack: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, blockingPiece, currentPawnBlack, blockingPiece2, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const blockingPieceBefore: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 1, y: 1 },
    side: Side.White,
    isMoved: false,
};
export const blockingPiece2Before: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 3, y: 1 },
    side: Side.White,
    isMoved: false,
};
export const currentBoardPassantBlackBefore: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, blockingPieceBefore, null, blockingPiece2Before, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, currentPawnBlack, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
export const el1: CordWithMoveType = {
    x: 1,
    y: 2,
    moveType: MoveType.EnPassant,
};
export const el2: CordWithMoveType = {
    x: 3,
    y: 2,
    moveType: MoveType.EnPassant,
};
export const passantBlackResult: CordWithMoveType[] = [el1, el2];

//White

export const currentPawnWhite: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 3, y: 4 },
    side: Side.White,
    isMoved: true,
};
export const blockingPieceWhite: Piece = {
    figType: PieceType.Bishop,
    cord: { x: 1, y: 7 },
    side: Side.Black,
    isMoved: true,
};

export const blockingPiece3: Piece = { figType: PieceType.Pawn, cord: { x: 2, y: 4 }, side: Side.Black, isMoved: true };
export const blockingPiece4: Piece = { figType: PieceType.Pawn, cord: { x: 4, y: 4 }, side: Side.Black, isMoved: true };

export const currentBoardMoveWhite: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, blockingPiece3, currentPawnWhite, blockingPiece4, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const blockingPiece3Before: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 2, y: 6 },
    side: Side.Black,
    isMoved: false,
};
export const blockingPiece4Before: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 4, y: 6 },
    side: Side.Black,
    isMoved: false,
};

export const currentBoardMoveWhiteBefore: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, currentPawnWhite, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, blockingPiece3Before, null, blockingPiece4Before, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const el3: CordWithMoveType = {
    x: 2,
    y: 5,
    moveType: MoveType.EnPassant,
};
export const el4: CordWithMoveType = {
    x: 4,
    y: 5,
    moveType: MoveType.EnPassant,
};
export const passantWhiteResult: CordWithMoveType[] = [el3, el4];
