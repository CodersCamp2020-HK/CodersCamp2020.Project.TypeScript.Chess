import { Game } from './components/game/Game';
import './app.scss';

const App = (): void => {
    const game = new Game();
    document.body.appendChild(game.element);
};

export default App;
