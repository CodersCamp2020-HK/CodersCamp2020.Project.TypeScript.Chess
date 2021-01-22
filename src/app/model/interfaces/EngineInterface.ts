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

enum MoveType {
    NormalMove,
    Capture,
    Castling,
}

interface CordWithMoveType extends Cord {
    moveType: MoveType;
}

type PieceType = Pawn | Queen | King | Bishop | Rook | Knight;
interface Piece {
    cord: Cord;
    side: Side;
    getAllPossibleMoves(): CordWithMoveType[]; // Zwraca wszystkie moliwe ruchy
}

interface Pawn extends Piece {
    isMoved: boolean;
    promotion(): PieceType;
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

class queen implements Queen {
    cord: Cord;
    side: Side;
    constructor(cord: Cord, side: Side) {
        this.cord = cord;
        this.side = side;
    }
    getAllPossibleMoves() {
        const xy: CordWithMoveType = { x: 5, y: 5, moveType: MoveType.NormalMove };
        const arr: CordWithMoveType[] = [];
        arr.push(xy);
        return arr;
    }
}

const q = new queen({ x: 5, y: 1 }, Side.Black);
console.log(q);

type ChessBoardRepresentation = Array<Array<PieceType | null>>;

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
    checkCastle(kingsCord: Cord, rooksCord: Cord, boardState: ChessBoard): boolean;
    castle(kingsCord: Cord, rooksCord: Cord, boardState: ChessBoard): CordWithMoveType;
}

export { ChessBoardDefault, ChessBoardState, ChessEngine };
