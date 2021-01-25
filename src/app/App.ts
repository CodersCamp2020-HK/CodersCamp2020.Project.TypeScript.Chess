import { Game } from './view/game/Game';

const App = (): void => {
    const gameComponent = new Game();
    gameComponent.createGameWrapper();
    document.body.appendChild(gameComponent.gameWrapper);
};

export default App;
