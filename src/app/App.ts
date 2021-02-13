import { convertEmojiToRep } from '../../spec/Display';
import { Game } from '../app/components/game/Game';

const App = (): void => {
    const emojiBoard = [
        ['♜', '♚', '♛', '.', '.', '.', '.', '.'],
        ['.', '.', '♟', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '♖', '.', '.', '♗', '.', '.'],
        ['.', '.', '.', '.', '♙', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
    ];
    console.log(convertEmojiToRep(emojiBoard));
    const game = new Game();
    document.body.appendChild(game.element);
};

export default App;
