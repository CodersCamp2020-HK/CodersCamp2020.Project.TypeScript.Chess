import { Game } from './view/game/Game';

const App = (): void => {
    const game = new Game();
    document.body.appendChild(game.element);
};

export default App;
