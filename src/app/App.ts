import { Cord, IChessBoard, PieceType, Side, Piece } from './domain/basicChessTypes';
import { ChessEngine } from './infrastructure/ChessEngine';

const App = (): void => {
    const chessEngine = new ChessEngine();
    const cord: Cord = { x: 3, y: 4 };
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
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, bishop, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ],
    };
    console.log(board.board);
    console.log(chessEngine.getPossibleMovesForBishop(cord, board));
};

export default App;
