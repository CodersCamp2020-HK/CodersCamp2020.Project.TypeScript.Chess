interface Cord {
    x: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    y: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

enum Side {
    White,
    Black,
}

interface PieceMove {
    from: Cord;
    to: Cord;
}

interface CordWithMoveType extends Cord {
    moveType: MoveType;
}

interface BoardField {
    piece: PieceType;
    side: Side;
}

interface Piece {
    cord: Cord;
    side: Side;
    getPossibleMoves(): CordWithMoveType[];
}

interface Pawn extends Piece {
    isMoved: boolean;
    promotion(): BoardField;
}

interface King extends Piece {
    isMoved: boolean;
}

interface Rook extends Piece {
    isMoved: boolean;
}

type Queen = Piece;
type Bishop = Piece;
type Knight = Piece;

type PieceType = Pawn | Queen | King | Bishop | Rook | Knight;

class queen implements Queen {
    cord: Cord;
    side: Side;
    constructor(cord: Cord, side: Side) {
        this.cord = cord;
        this.side = side;
    }
    getPossibleMoves() {
        const xy: CordWithMoveType = { x: 5, y: 5, moveType: MoveType.NormalMove };
        const arr: CordWithMoveType[] = [];
        arr.push(xy);
        return arr;
    }
}

const q = new queen({ x: 5, y: 1 }, Side.Black);
console.log(q);

enum MoveType {
    NormalMove,
    Capture,
    Castling,
}

type ChessBoardRepresentation = Array<Array<BoardField | null>>;

interface ChessBoard {
    board: ChessBoardRepresentation;
    makeMove(piece: PieceType, move: PieceMove): void;
    hasPiece(cord: Cord): boolean;
}

interface ChessBoardDefault {
    pickSide(): Side; // W sposób losowy
    setUpChessBoard(): ChessBoardRepresentation; // Ustawienia początkowe szachownicy
}

interface ChessBoardState {
    isCheck(boardState: ChessBoard, side: Side): boolean;
    isCheckmate(boardState: ChessBoard, side: Side): boolean;
    isStealemate(boardState: ChessBoard, side: Side): boolean;
}

interface ChessEngine {
    getPossibleMovesForPiece(cord: Cord, boardState: ChessBoard): CordWithMoveType[]; // Czy ruch rodzielać względem figur, czy kierunków?
    promotePawn(cord: Cord, boardState: ChessBoard): BoardField; // Czy to nie powinno być wykonywane automatycznie po ruchu?
    checkCastle(kingsCord: Cord, rooksCord: Cord, boardState: ChessBoard): boolean;
    castle(kingsCord: Cord, rooksCord: Cord, boardState: ChessBoard): CordWithMoveType;
}

export { ChessBoardDefault, ChessBoardState, ChessEngine };
