import { Cord, Piece, PieceType, Side } from './basicChessTypes';

export type ChessBoardView = ReadonlyArray<ReadonlyArray<Readonly<Piece> | null>>;

export interface IChessBoard {
    board: ChessBoardView;
    makeMove(piece: Piece, moveTo: Cord): void;
    getPieces(side: Side, pieceType: PieceType): Piece[] | null;
    getPiece(cord: Cord): Piece | null;
}
