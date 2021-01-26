export interface Cord {
    x: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    y: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export enum Side {
    White,
    Black,
}

export interface PieceMove {
    from: Cord;
    to: Cord;
}

export enum MoveType {
    NormalMove,
    Capture,
    Castling,
    Promotion,
    EnPassant,
}

export interface CordWithMoveType extends Cord {
    moveType: MoveType;
}

export enum PieceType {
    Pawn,
    Rook,
    Knight,
    Bishop,
    Queen,
    King,
}

export interface Piece {
    figType: PieceType;
    cord: Cord;
    side: Side;
    isMoved: boolean;
}

export type ChessBoardRepresentation = Array<Array<Piece | null>>;

export interface IChessBoard {
    board: ChessBoardRepresentation;
    makeMove(piece: Piece, move: PieceMove): void;
    hasPiece(cord: Cord): boolean;
}

export type PickSide = () => Side;
