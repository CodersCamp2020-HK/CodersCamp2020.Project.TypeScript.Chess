import { convertEmojiToRep } from '../../spec/Display';
import { Game } from '../app/components/game/Game';
import { ChessBoardPresenter } from './components/ChessBoardPresenter/ChessBoardPresenter';
import { IChessBoardPresenter } from './domain/IPresenter';
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
    const board = convertEmojiToRep(emojiBoard);

    const presenter: IChessBoardPresenter = new ChessBoardPresenter();
    const game = new Game(presenter.element);
    document.body.append(game.element);
    const board2 = new ChessBoard();
    presenter.render(board2.board);
};

export default App;
