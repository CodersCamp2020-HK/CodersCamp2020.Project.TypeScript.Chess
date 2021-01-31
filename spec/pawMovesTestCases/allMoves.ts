import {
    Cord,
    IChessBoard,
    CordWithMoveType,
    MoveType,
    ChessBoardRepresentation,
    PieceType,
    Piece,
    Side,
} from '../../src/app/domain/basicChessTypes';
import { blockingPiece2Before } from './enPassantMove';

export const currentPawnBlack: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 2, y: 3 },
    side: Side.Black,
    isMoved: true,
};
export const blockingPiece: Piece = { figType: PieceType.Rook, cord: { x: 1, y: 2 }, side: Side.White, isMoved: true };
export const blockingPiece2: Piece = { figType: PieceType.Pawn, cord: { x: 3, y: 3 }, side: Side.White, isMoved: true };
export const currentBoardCaptureBlack: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, blockingPiece, null, null, null, null, null, null],
    [null, null, currentPawnBlack, blockingPiece2, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

const blockingPiece2Before: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 3, y: 1 },
    side: Side.White,
    isMoved: false,
};
export const currentBoardCaptureBlackBefore: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, blockingPiece2Before, null, null, null, null],
    [null, blockingPiece, null, null, null, null, null, null],
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
    moveType: MoveType.EnPassant,
};
export const el3: CordWithMoveType = {
    x: 2,
    y: 2,
    moveType: MoveType.NormalMove,
};

export const captureBlackResult: CordWithMoveType[] = [el3, el1, el2];
