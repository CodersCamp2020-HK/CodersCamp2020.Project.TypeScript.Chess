import { convertEmojiToRep } from '../../spec/Display';
import { Game } from '../app/components/game/Game';
import { GameController } from '../app/infrastructure/GameController';
import { ChessBoardPresenter } from './components/ChessBoardPresenter/ChessBoardPresenter';
import { MoveType, Piece, PromotionPieceType, Side } from './domain/basicChessTypes';
import { ChessBoardSquareDisplayType, CordWithDisplayType, IChessBoardPresenter } from './domain/IPresenter';
import { ChessBoard } from './infrastructure/ChessBoard';
import { GameStatsPresenter } from '../app/components/GameStatsPresenter/GameStatsPresenter';
import { IGameStatsPresenter } from './domain/IGameStatsPresenter';
import { MainMenu } from './components/MainMenu/MainMenu';

const App = (): void => {
    // const gameStatsPresenter: IGameStatsPresenter = new GameStatsPresenter();
    // const presenter: IChessBoardPresenter = new ChessBoardPresenter();
    // const gameController = new GameController(presenter, (score) => console.log(score));
    // const game = new Game(presenter.element);
    // document.body.append(game.element);
    // document.body.append(gameStatsPresenter.element);
    const mainMenu = new MainMenu(() => {
        console.log('xxx');
    });
    document.body.append(mainMenu.element);
};

export default App;
