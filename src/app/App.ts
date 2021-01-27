import { Cord, IChessBoard, PieceType, Side, Piece } from './domain/basicChessTypes';
import { ChessEngine } from './infrastructure/ChessEngine';

const App = (): void => {
    const chessEngine = new ChessEngine();
    const cord: Cord = { x: 2, y: 1 };
    const bishop: Piece = {
        figType: PieceType.Bishop,
        cord: cord,
        side: Side.White,
        isMoved: true,
    };
    const board: IChessBoard = {
        board: [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, bishop, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ],
    };
    console.log(chessEngine.getPossibleMovesForBishop(cord, board));
};

export default App;
