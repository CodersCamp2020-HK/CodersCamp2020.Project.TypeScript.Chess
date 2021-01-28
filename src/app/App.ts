import { Cord, IChessBoard, PieceType, Side, Piece } from './domain/basicChessTypes';
import { ChessEngine } from './infrastructure/ChessEngine';

const App = (): void => {
    const chessEngine = new ChessEngine();
    const cord: Cord = { x: 2, y: 1 };
    const pawn1: Piece = {
        figType: PieceType.Pawn,
        cord: { x: 3, y: 2 },
        side: Side.White,
        isMoved: true,
    };
    const pawn2: Piece = {
        figType: PieceType.Pawn,
        cord: { x: 0, y: 3 },
        side: Side.Black,
        isMoved: true,
    };
    const pawn3: Piece = {
        figType: PieceType.Pawn,
        cord: { x: 1, y: 0 },
        side: Side.Black,
        isMoved: true,
    };
    const bishop: Piece = {
        figType: PieceType.Bishop,
        cord: cord,
        side: Side.White,
        isMoved: true,
    };
    const board: IChessBoard = {
        board: [
            [null, pawn3, null, pawn2, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, bishop, null, null, null, null, null, null],
            [null, null, pawn1, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ],
    };
    chessEngine.getPossibleMovesForBishop(cord, board);
};

export default App;
