import { Game } from './components/game/Game';

const App = (): void => {
    const game = new Game();
    document.body.appendChild(game.element);
};

export default App;
