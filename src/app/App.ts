import { convertEmojiToRep } from '../../spec/Display';
import { Game } from '../app/components/game/Game';
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
    const board = convertEmojiToRep(emojiBoard);

    const presenter: IChessBoardPresenter = new ChessBoardPresenter();
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
        presenter.onClick((cord) => {
            presenter.clearMarkedFields();
            presenter.markFields([{ ...cord, display: ChessBoardSquareDisplayType.Move }], Side.Black);
            console.log(`Click on (${cord.x}, ${cord.y})`);
        });
        presenter.onHover((cord) => {
            presenter.clearMarkedFields();
            presenter.markFields([{ ...cord, display: ChessBoardSquareDisplayType.Normal }], Side.Black);
            console.log(`Hover on (${cord.x}, ${cord.y})`);
        });
    }, 5000);

    window.setTimeout(() => {
        presenter.render(board);
    }, 10000);

    window.setTimeout(() => {
        presenter.render(board2.board);
    }, 20000);
};

export default App;
