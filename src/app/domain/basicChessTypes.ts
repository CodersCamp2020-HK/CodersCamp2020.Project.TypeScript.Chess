export interface PossibleCords {
    x: number | undefined;
    y: number | undefined;
}

export interface Cord {
    x: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    y: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export enum Side {
    White,
    Black,
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

export type PickSide = () => Side;

export interface CordWithMoveTypes extends Cord {
    moveType: MoveType[];
}
