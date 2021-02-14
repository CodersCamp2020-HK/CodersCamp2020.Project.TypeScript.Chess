import { CordWithMoveType, MoveType, PieceType, Piece, Side } from '../../src/app/domain/basicChessTypes';
import { ChessBoardView } from '../../src/app/domain/IChessBoard';

export const currentPawnBlack: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 4, y: 2 },
    side: Side.Black,
    isMoved: true,
};
export const blockingPiece: Piece = { figType: PieceType.Rook, cord: { x: 5, y: 1 }, side: Side.White, isMoved: true };
export const blockingPiece2: Piece = { figType: PieceType.Pawn, cord: { x: 4, y: 3 }, side: Side.White, isMoved: true };
export const currentBoardCaptureBlack: ChessBoardView = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, currentPawnBlack, blockingPiece2, null, null, null, null],
    [null, blockingPiece, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

const blockingPiece2Before: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 6, y: 3 },
    side: Side.White,
    isMoved: false,
};
export const currentBoardCaptureBlackBefore: ChessBoardView = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, currentPawnBlack, null, null, null, null, null],
    [null, blockingPiece, null, null, null, null, null, null],
    [null, null, null, blockingPiece2Before, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

export const el1: CordWithMoveType = {
    x: 5,
    y: 1,
    moveType: MoveType.Capture,
};
export const el2: CordWithMoveType = {
    x: 5,
    y: 3,
    moveType: MoveType.EnPassant,
};
export const el3: CordWithMoveType = {
    x: 5,
    y: 2,
    moveType: MoveType.NormalMove,
};

export const captureBlackResult: CordWithMoveType[] = [el3, el1, el2];
