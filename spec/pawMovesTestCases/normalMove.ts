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
const blockingPiece: Piece = { figType: PieceType.Pawn, cord: { x: 1, y: 5 }, side: Side.Black, isMoved: true };
export const currentBoardMoveForBlack: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, pawnNormalBlack, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
export const currentBoardMoveForBlackBlocked: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, blockingPiece, null, null, null, null, null, null],
    [null, pawnNormalBlack, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
export const moveForBlackResult: CordWithMoveType = {
    x: 1,
    y: 5,
    moveType: MoveType.NormalMove,
};
export const moveForBlackResults: CordWithMoveType[] = [moveForBlackResult];

//White

export const pawnNormalWhite: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 1, y: 6 },
    side: Side.White,
    isMoved: true,
};
const blockingPieceForWhite: Piece = {
    figType: PieceType.Bishop,
    cord: { x: 1, y: 7 },
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
    [null, pawnNormalWhite, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const currentBoardMoveForWhiteBlocked: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, pawnNormalWhite, null, null, null, null, null, null],
    [null, blockingPieceForWhite, null, null, null, null, null, null],
];

const moveForWhiteResult: CordWithMoveType = {
    x: 1,
    y: 7,
    moveType: MoveType.NormalMove,
};
export const moveForWhiteResults: CordWithMoveType[] = [moveForWhiteResult];
