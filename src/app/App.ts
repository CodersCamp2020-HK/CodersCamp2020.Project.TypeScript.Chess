import { convertEmojiToRep } from '../../spec/Display';
import { Game } from '../app/components/game/Game';
import { GameController } from '../app/infrastructure/GameController';
import { ChessBoardPresenter } from './components/ChessBoardPresenter/ChessBoardPresenter';
import { Side } from './domain/basicChessTypes';
import { ChessBoardSquareDisplayType, CordWithDisplayType, IChessBoardPresenter } from './domain/IPresenter';
import { ChessBoard } from './infrastructure/ChessBoard';

const App = (): void => {
    const emojiBoard = [
        ['♜', '♚', '♛', '♜', '♜', '♜', '♜', '♜'],
        ['.', '.', '♟', '♜', '♜', '♜', '♜', '♜'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '♖', '.', '.', '♗', '.', '.'],
        ['.', '.', '.', '.', '♙', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
    ];
    const presenter: IChessBoardPresenter = new ChessBoardPresenter();
    const gameController = new GameController();
    const board = convertEmojiToRep(emojiBoard);

    const game = new Game(presenter.element);
    document.body.append(game.element);
    const board2 = new ChessBoard();
    presenter.render(board2.board);
    const cords: CordWithDisplayType[] = [
        { x: 0, y: 2, display: ChessBoardSquareDisplayType.Castling },
        { x: 6, y: 2, display: ChessBoardSquareDisplayType.Move },
        { x: 5, y: 2, display: ChessBoardSquareDisplayType.Normal },
    ];
    presenter.markFields(cords, Side.Black);
    window.setTimeout(() => {
        presenter.clearMarkedFields();
    }, 5000);
};

export default App;
