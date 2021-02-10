import { convertEmojiToRep } from '../../spec/Display';
import { PreviousMoves } from './components/PreviousMoves/previousMoves';

const App = (): void => {
    const not = new PreviousMoves([
        {
            white: 'Pa3a4',
            black: 'Na5b7',
        },
        {
            white: 'Pa3a4',
            black: 'Na5b7',
        },
    ]);
    document.body.append(not.element);
};

export default App;
