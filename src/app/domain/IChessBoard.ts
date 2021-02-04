import { Piece } from './basicChessTypes';

export type ChessBoardView = ReadonlyArray<ReadonlyArray<Readonly<Piece> | null>>;

export interface IChessBoard {
    board: ChessBoardView;
    // makeMove(piece: Piece, move: PieceMove): void;
    // hasPiece(cord: Cord): boolean;
}
