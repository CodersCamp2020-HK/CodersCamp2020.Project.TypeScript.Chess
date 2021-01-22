import { SourceMapDevToolPlugin } from 'webpack';

enum PieceType {
    Pawn,
    King,
    Queen,
    Rook,
    Bishop,
    Knight,
}

enum Side {
    White,
    Black,
}

interface BoardField {
    piece: PieceType;
    side: Side;
}

type ChessBoardRep = Array<Array<BoardField | null>>;

interface Cord {
    x: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    y: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

interface PieceMove {
    from: Cord;
    to: Cord;
}

interface ChessBoard {
    board: ChessBoardRep;
    makeMove(piece: PieceType, move: PieceMove): void;
    hasPiece(cord: Cord): boolean;
}
