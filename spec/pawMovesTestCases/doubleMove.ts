import {
    CordWithMoveType,
    MoveType,
    ChessBoardRepresentation,
    PieceType,
    Side,
    Piece,
} from '../../src/app/domain/basicChessTypes';
export const pawnNormalBlack: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 1, y: 6 },
    side: Side.Black,
    isMoved: true,
};
export const blockingPiece: Piece = { figType: PieceType.Pawn, cord: { x: 1, y: 4 }, side: Side.Black, isMoved: true };
export const currentBoardMoveBlack: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, pawnNormalBlack, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
export const currentBoardMoveBlackBlocked: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, blockingPiece, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, pawnNormalBlack, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
export const el1: CordWithMoveType = {
    x: 1,
    y: 4,
    moveType: MoveType.NormalMove,
};
export const doubleBlackResult: CordWithMoveType[] = [el1];

//White

export const pawnDoublelWhite: Piece = {
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
    [null, pawnDoublelWhite, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const currentBoardMoveWhiteBlocked: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, pawnDoublelWhite, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, blockingPieceWhite, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const el2: CordWithMoveType = {
    x: 1,
    y: 3,
    moveType: MoveType.NormalMove,
};
export const doubleWhiteResult: CordWithMoveType[] = [el2];
