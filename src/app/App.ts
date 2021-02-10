import { convertEmojiToRep } from '../../spec/Display';
import { Game } from '../app/components/game/Game';
import { GameController } from '../app/infrastructure/GameController';
import { ChessBoardPresenter } from './components/ChessBoardPresenter/ChessBoardPresenter';
import { Side } from './domain/basicChessTypes';
import { ChessBoardSquareDisplayType, CordWithDisplayType, IChessBoardPresenter } from './domain/IPresenter';
import { ChessBoard } from './infrastructure/ChessBoard';

const App = (): void => {
    const presenter: IChessBoardPresenter = new ChessBoardPresenter();
    const gameController = new GameController(presenter, (score) => console.log(score));
    const game = new Game(presenter.element);
    document.body.append(game.element);
};

export default App;
