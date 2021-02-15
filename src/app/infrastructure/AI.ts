// eslint-disable-next-line @typescript-eslint/no-var-requires
// const stockfish = require('./stockfish.js');
// import stockfish from '../../assets/stockfish/stockfish.js';
// console.log(stockfish);

export class AI {
    engine: any;
    depth: number;
    previousMoves: string;
    lastMove = '';
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
                this.previousMoves =
                    this.previousMoves.length === 0 ? this.lastMove : this.previousMoves + ` ${this.lastMove}`;
                this.previousMoves += 'e7e5';
                console.log(this.lastMove);
                console.log(this.previousMoves);
            }
        };
        this.engine.postMessage('ucinewgame');
        this.engine.postMessage('isready');
    }

    getMove() {
        if (!this.engine) throw new Error('Nie ma stockfisha!');
        this.engine.postMessage(`position startpos moves ${this.previousMoves}`);
        this.engine.postMessage(`go depth ${this.depth}`);
        this.engine.postMessage('d');
    }
}
