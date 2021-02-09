import { Game } from './components/game/Game';
import { IChessBoard, PieceType, Side, Piece } from './domain/basicChessTypes';
import { ChessEngine } from './infrastructure/ChessEngine';
import { GameState } from './infrastructure/GameState';
import './app.scss';
import { Radios } from './components/radios/radiosComponent';

const App = (): void => {
    const opt = new Radios([
        {
            value: '1',
            label: 'one',
            category: 'numbers',
        },
        {
            value: '2',
            label: 'two',
            category: 'numbers',
        },
    ]);

    document.body.appendChild(opt._element);
};

export default App;
