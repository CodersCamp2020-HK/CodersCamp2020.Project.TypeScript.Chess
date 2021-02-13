import { convertEmojiToRep } from '../../spec/Display';
import { Game } from '../app/components/game/Game';
import { GameController } from '../app/infrastructure/GameController';
import { ChessBoardPresenter } from './components/ChessBoardPresenter/ChessBoardPresenter';
import { Side } from './domain/basicChessTypes';
import { ChessBoardSquareDisplayType, CordWithDisplayType, IChessBoardPresenter } from './domain/IPresenter';
import { ChessBoard } from './infrastructure/ChessBoard';
import { ChessBoardVoiceInputDevice } from './infrastructure/ChessBoardVoiceInputDevice';

const App = (): void => {
    const presenter = new ChessBoardPresenter();

    const voiceInputDevice = new ChessBoardVoiceInputDevice();
    voiceInputDevice.onClick((cord) => {
        console.log(`Click: ${cord.x}, ${cord.y}`);
    });
    voiceInputDevice.onHover((cord) => {
        console.log(`Hover: ${cord.x}, ${cord.y}`);
    });
    voiceInputDevice.start();
    const gameController = new GameController(presenter, voiceInputDevice, (score) => console.log(score));
    const game = new Game(presenter.element);
    document.body.append(game.element);
};

export default App;
