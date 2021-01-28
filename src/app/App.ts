import { Cord, IChessBoard, PieceType, Side, Piece } from './domain/basicChessTypes';
import { ChessEngine } from './infrastructure/ChessEngine';

const App = (): void => {
    const chessEngine = new ChessEngine();
    // const cord: Cord = { x: 2, y: 1 };
    const pawn1: Piece = {
        figType: PieceType.Pawn,
        cord: { x: 5, y: 4 },
        side: Side.White,
        isMoved: true,
    };
    const pawn2: Piece = {
        figType: PieceType.Pawn,
        cord: { x: 1, y: 4 },
        side: Side.White,
        isMoved: true,
    };
    const pawn3: Piece = {
        figType: PieceType.Pawn,
        cord: { x: 1, y: 5 },
        side: Side.White,
        isMoved: true,
    };
    const pawn4: Piece = {
        figType: PieceType.Pawn,
        cord: { x: 1, y: 0 },
        side: Side.Black,
        isMoved: true,
    };
    const bishop: Piece = {
        figType: PieceType.Bishop,
        cord: { x: 3, y: 2 },
        side: Side.White,
        isMoved: true,
    };
    const king: Piece = {
        figType: PieceType.King,
        cord: { x: 0, y: 2 },
        side: Side.Black,
        isMoved: true,
    };
    const rook: Piece = {
        figType: PieceType.Rook,
        cord: { x: 1, y: 1 },
        side: Side.Black,
        isMoved: false,
    };

    const board: IChessBoard = {
        board: [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ],
    };

    board.board[pawn1.cord.x][pawn1.cord.y] = pawn1;
    board.board[pawn2.cord.x][pawn2.cord.y] = pawn2;
    // board.board[pawn3.cord.x][pawn3.cord.y] = pawn3;
    // board.board[pawn4.cord.x][pawn4.cord.y] = pawn4;
    board.board[bishop.cord.x][bishop.cord.y] = bishop;
    // board.board[king.cord.x][king.cord.y] = king;
    // board.board[rook.cord.x][rook.cord.y] = rook;

    chessEngine.getPossibleMovesForBishop(bishop.cord, board);
    chessEngine.getPossibleMovesForKing(king.cord, board);
    chessEngine.getPossibleMovesForRook(rook.cord, board);
};

export default App;
