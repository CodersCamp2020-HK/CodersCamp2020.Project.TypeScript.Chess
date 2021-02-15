import { convertEmojiToRep } from '../../spec/Display';
import { Game } from '../app/components/game/Game';
import { GameController } from '../app/infrastructure/GameController';
import { ChessBoardPresenter } from './components/ChessBoardPresenter/ChessBoardPresenter';
import { MoveType, Piece, PromotionPieceType, Side } from './domain/basicChessTypes';
import { ChessBoardSquareDisplayType, CordWithDisplayType, IChessBoardPresenter } from './domain/IPresenter';
import { ChessBoard } from './infrastructure/ChessBoard';
import { ChessBoardVoiceInputDevice } from './infrastructure/ChessBoardVoiceInputDevice';
import { GameStatsPresenter } from '../app/components/GameStatsPresenter/GameStatsPresenter';
import { IGameStatsPresenter } from './domain/IGameStatsPresenter';
import { sayText } from './components/PreviousMoves/sayText';
import { PreviousMoves } from './components/PreviousMoves/previousMoves';
import { MainMenu, StartGameParams } from './components/MainMenu/MainMenu';
import { IChessBoardInputDevice, InputDeviceCallback } from './domain/IChessBoardInputDevice';

const App = (): void => {
    const startGame = (startGameParams: StartGameParams) => {
        const gameTimeInSeconds = 10;

        const voiceInputDevice = new ChessBoardVoiceInputDevice();
        voiceInputDevice.start();
        const presenter = new ChessBoardPresenter();
        const gameStatsPresenter = new GameStatsPresenter(gameTimeInSeconds, 0);
        const inputDevice: IChessBoardInputDevice = {
            onClick: (cb: InputDeviceCallback) => {
                presenter.inputDevice.onClick(cb);
                voiceInputDevice.onClick(cb);
            },
            onHover: (cb: InputDeviceCallback) => {
                presenter.inputDevice.onHover(cb);
                voiceInputDevice.onHover(cb);
            },
        };

        const gameController = new GameController(
            startGameParams,
            presenter,
            gameStatsPresenter,
            inputDevice,
            (score) => console.log(score),
        );

        const game = new Game(presenter.element, gameStatsPresenter.element);
        document.body.append(game.element);
    };

    const mainMenu = new MainMenu((params) => {
        document.body.removeChild(mainMenu.element);
        startGame(params);
    });
    document.body.append(mainMenu.element);
};

export default App;
