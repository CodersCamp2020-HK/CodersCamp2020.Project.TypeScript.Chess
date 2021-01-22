enum PieceType {
    Pawn,
    King,
    Queen,
    Rook,
    Bishop,
    Knight,
}

// type PieceType = Pawn;

enum Side {
    White,
    Black,
}

enum MoveType {
    NormalMove,
    Capture,
    Castling,
}

interface BoardField {
    piece: PieceType;
    side: Side;
}

type ChessBoardRepresentation = Array<Array<BoardField | null>>;

interface Cord {
    x: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
    y: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

// interface Cord {
//     x: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
//     y: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
// }

interface PieceMove {
    from: Cord;
    to: Cord;
}

interface CordWithMoveType extends Cord {
    moveType: MoveType;
}

interface ChessBoard {
    board: ChessBoardRepresentation;
    makeMove(piece: PieceType, move: PieceMove): void;
    hasPiece(cord: Cord): boolean;
}

export interface ChessBoardDefault {
    pickSide(): Side; // W sposób losowy
    setUpChessBoard(): ChessBoardRepresentation; // Ustawienia początkowe szachownicy
}

export interface ChessBoardState {
    isCheck(boardState: ChessBoard, side: Side): boolean;
    isCheckmate(boardState: ChessBoard, side: Side): boolean;
    isStealemate(boardState: ChessBoard, side: Side): boolean;
}

export interface ChessEngine {
    getPossibleMovesForPiece(cord: Cord, boardState: ChessBoard): CordWithMoveType[]; // Czy ruch rodzielać względem figur, czy kierunków?
    promotePawn(cord: Cord, boardState: ChessBoard): BoardField; // Czy to nie powinno być wykonywane automatycznie po ruchu?
    checkCastle(kingsCord: Cord, rooksCord: Cord, boardState: ChessBoard): boolean;
    castle(kingsCord: Cord, rooksCord: Cord, boardState: ChessBoard): CordWithMoveType;
}

// Czy nie lepiej zamiast enuma dać obiekty na podstawie klasy?

// interface Piece {
//     getPossibleMoves(): Array<CordWithMoveType>;
// }

// interface Pawn extends Piece {
//     isMoved: boolean;
//     isPromoted: boolean;
//     promotion(): BoardField;
// }

// interface King extends Piece {
//     isMoved: boolean;
// }

// interface ChessEngine {}
