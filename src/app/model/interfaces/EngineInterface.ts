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

enum PieceType {
    Pawn,
    Rook,
    Knight,
    Bishop,
    Queen,
    King,
}

interface Piece {
    piece: PieceType;
    cord: Cord;
    side: Side;
    isMoved: boolean;
}

type ChessBoardRepresentation = Array<Array<Piece | null>>;

interface IChessBoard {
    board: ChessBoardRepresentation;
    makeMove(piece: Piece, move: PieceMove): void;
    hasPiece(cord: Cord): boolean;
}

type pickSide = () => Side;
type setUpChessBoard = () => ChessBoardRepresentation;
type checkCastle = (kingsCord: Cord, rooksCord: Cord, boardState: IChessBoard) => boolean;
type makeCastle = (kingsCord: Cord, rooksCord: Cord, boardState: IChessBoard) => CordWithMoveType;

interface IChessEngine {
    isCheck(boardState: IChessBoard, side: Side): boolean;
    isCheckmate(boardState: IChessBoard, side: Side): boolean;
    isStealemate(boardState: IChessBoard, side: Side): boolean;
    // getPossibleMovesForPiece będzie uruchamiała funkcje w zalezności od figury
    getPossibleMovesForPiece(cord: Cord, boardState: IChessBoard): CordWithMoveType[];

    getPossibleMovesForPawn(cord: Cord, boardState: IChessBoard): CordWithMoveType[];
    getPossibleMovesForRook(cord: Cord, boardState: IChessBoard): CordWithMoveType[];
    getPossibleMovesForKnight(cord: Cord, boardState: IChessBoard): CordWithMoveType[];
    getPossibleMovesForBishop(cord: Cord, boardState: IChessBoard): CordWithMoveType[];
    getPossibleMovesForQueen(cord: Cord, boardState: IChessBoard): CordWithMoveType[];
    getPossibleMovesForKing(cord: Cord, boardState: IChessBoard): CordWithMoveType[];

    removeMovesOutsideChessBoard(cords: CordWithMoveType[]): CordWithMoveType[];
    removeMovesBlockedByPiece(cords: CordWithMoveType[]): CordWithMoveType[];
}

export { IChessEngine, IChessBoard, pickSide, setUpChessBoard, checkCastle, makeCastle };
