export interface PossibleCords {
    x: number | undefined;
    y: number | undefined;
}

export interface Cord {
    x: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    y: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

const _allBoardCords: Cord[] = [];
for (let i = 0; i < 8; ++i) {
    for (let j = 0; j < 8; ++j) {
        _allBoardCords.push({ x: i, y: j } as Cord);
    }
}
export const allBoardCords: ReadonlyArray<Readonly<Cord>> = _allBoardCords;

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

export enum Score {
    WhiteWon,
    BlackWon,
    Draw,
}

export type PickSide = () => Side;

export type StringPieces = 'queen' | 'king' | 'pawn' | 'knight' | 'rook' | 'bishop';

export type CapturedPiecesSide = 'player' | 'opponent';
export interface CordWithMoveTypes extends Cord {
    moveType: MoveType[];
}

export enum PromotionPieceType {
    Rook,
    Knight,
    Bishop,
    Queen,
}

export interface Move {
    from: Cord;
    to: Cord;
}
