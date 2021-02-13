import { convertEmojiToRep } from '../../spec/Display';
import { Game } from './components/game/Game';

const App = (): void => {
    document.body.append(new Game().element);
};

export default App;
