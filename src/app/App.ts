import { Game } from './components/game/Game';
import { IChessBoard, PieceType, Side, Piece } from './domain/basicChessTypes';
import { ChessEngine } from './infrastructure/ChessEngine';
import { GameState } from './infrastructure/GameState';
import './app.scss';

const App = (): void => {
    console.log('Hi');
};

export default App;
