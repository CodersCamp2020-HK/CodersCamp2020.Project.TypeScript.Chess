import { Cord, Move } from '../domain/basicChessTypes';
import { translateToEngine, translateToStockfish } from '../utils/Stockfish';

export class AI {
    engine: Worker;
    depth: number;
    previousMoves: string;
    lastMove = '';
    private __resolve!: (value: Move) => void;
    private __reject!: (value: Move) => void;
    private lastCord!: Move;

    constructor(depth: number) {
        try {
            this.engine = new Worker('./stockfish.asm.js');
            this.depth = depth;
            this.previousMoves = '';
        } catch (error) {
            throw new Error(error);
        }

        this.engine.onmessage = (line: { data: string }) => {
            console.log(line.data);
            if (line.data.includes('bestmove')) {
                this.lastMove = line.data.slice(9, 14);
                this.updatePreviousMoves(this.lastMove);
                this.lastCord = translateToEngine(this.lastMove);

                console.log(this.lastMove);
                console.log(this.previousMoves);
                this.__resolve(this.lastCord);
            }
        };
        this.engine.postMessage('ucinewgame');
        this.engine.postMessage('isready');
    }

    updatePreviousMoves(move: string): void {
        this.previousMoves = this.previousMoves.length === 0 ? move : this.previousMoves + ` ${move}`;
    }

    getMove(from: Cord, to: Cord) {
        const move = translateToStockfish(from, to);
        this.updatePreviousMoves(move);
        if (!this.engine) throw new Error('Nie ma stockfisha!');
        this.engine.postMessage(`position startpos moves ${this.previousMoves}`);
        this.engine.postMessage(`go depth ${this.depth}`);
        this.engine.postMessage('d');
        return new Promise<Move>((resolve, reject) => {
            this.__resolve = resolve;
            this.__reject = reject;
        });
    }
}
