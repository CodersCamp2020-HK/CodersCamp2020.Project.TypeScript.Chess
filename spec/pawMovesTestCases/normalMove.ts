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
    cord: { x: 1, y: 1 },
    side: Side.Black,
    isMoved: false,
};
const blockingPiece: Piece = { figType: PieceType.Pawn, cord: { x: 2, y: 1 }, side: Side.Black, isMoved: true };
export const currentBoardMoveForBlack: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, pawnNormalBlack, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
export const currentBoardMoveForBlackBlocked: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, pawnNormalBlack, null, null, null, null, null, null],
    [null, blockingPiece, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
export const moveForBlackResult: CordWithMoveType = {
    x: 2,
    y: 1,
    moveType: MoveType.NormalMove,
};
export const moveForBlackResults: CordWithMoveType[] = [moveForBlackResult];

//White

export const pawnNormalWhite: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 7, y: 1 },
    side: Side.White,
    isMoved: false,
};
const blockingPieceForWhite: Piece = {
    figType: PieceType.Bishop,
    cord: { x: 6, y: 1 },
    side: Side.Black,
    isMoved: true,
};

export const currentBoardMoveForWhite: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, pawnNormalWhite, null, null, null, null, null, null],
];

export const currentBoardMoveForWhiteBlocked: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, blockingPieceForWhite, null, null, null, null, null, null],
    [null, pawnNormalWhite, null, null, null, null, null, null],
];

const moveForWhiteResult: CordWithMoveType = {
    x: 6,
    y: 1,
    moveType: MoveType.NormalMove,
};
export const moveForWhiteResults: CordWithMoveType[] = [moveForWhiteResult];
