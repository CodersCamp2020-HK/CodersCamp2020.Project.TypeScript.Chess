import { convertEmojiToRep } from '../../spec/Display';
import { PreviousMoves } from './components/PreviousMoves/previousMoves';

const App = (): void => {
    const not = new PreviousMoves([
        {
            white: 'Pa3a4x',
            black: '',
        },
        {
            white: 'Pa4a5',
            black: 'Ra6b7x#',
        },
        {
            white: '0-0-0',
            black: 'Pa6b7=Q',
        },
    ]);
    document.body.append(not.element);
};

export default App;
