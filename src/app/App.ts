import { convertEmojiToRep } from '../../spec/Display';
import { Game } from '../app/components/game/Game';
import { GameController } from '../app/infrastructure/GameController';
import { ChessBoardPresenter } from './components/ChessBoardPresenter/ChessBoardPresenter';
import { MoveType, Piece, PromotionPieceType, Side } from './domain/basicChessTypes';
import { ChessBoardSquareDisplayType, CordWithDisplayType, IChessBoardPresenter } from './domain/IPresenter';
import { ChessBoard } from './infrastructure/ChessBoard';
import { GameStatsPresenter } from '../app/components/GameStatsPresenter/GameStatsPresenter';
import { IGameStatsPresenter } from './domain/IGameStatsPresenter';
import { sayText } from './components/PreviousMoves/sayText';
import { PreviousMoves } from './components/PreviousMoves/previousMoves';
import { MainMenu } from './components/MainMenu/MainMenu';

const App = (): void => {
    const mainMenu = new MainMenu(() => {
        console.log('xxx');
    });
    document.body.append(mainMenu.element);
};

export default App;
