import styles from './previousMoves.module.scss';
import { piecesArray } from '../PiecesElements/piecesElements';
import { PieceElement } from '../ChessBoard/ChessBoardComponent';
import { Side, PieceType } from '../../domain/basicChessTypes';

interface Notation {
    white: string;
    black: string;
}

interface Object {
    [idx: string]: string;
}

export class PreviousMoves {
    element = document.createElement('div');
    notationArray: Notation[];
    constructor(notationArray: Notation[]) {
        this.element.classList.add(styles.wrapper);
        this.notationArray = notationArray;
        this.render(notationArray);
    }

    render(notationArray: Notation[]): void {
        this.element.innerHTML = '';
        this.notationArray = notationArray;

        const ol = document.createElement('ol');

        notationArray.forEach((notation) => {
            const li = document.createElement('li');
            li.classList.add(styles.listItem);

            const piecesMap = new Map([
                ['K', 5],
                ['Q', 1],
                ['R', 4],
                ['B', 3],
                ['N', 2],
                ['P', 0],
            ]);

            const currentTypeBlue = piecesMap.get(notation.black[0])!;

            const pieceElementBlue: PieceElement | undefined = piecesArray.find((element) => {
                if (element.figType == currentTypeBlue && element.side == Side.Black) {
                    return true;
                }
            });

            const blueOrigin = notation.black.slice(1, 3);
            const blueDestination = notation.black.includes('x')
                ? notation.black.slice(4, 6)
                : notation.black.slice(3, 5);

            //`${bluePiece} ${blueOrigin} > ${blueDestination} `

            const imgBlue = pieceElementBlue?.element.cloneNode(true)! as HTMLImageElement;
            imgBlue.width = 18;
            imgBlue.height = 18;

            const blueSpan = document.createElement('span');
            blueSpan.append(imgBlue, `${blueOrigin} > ${blueDestination} `);
            blueSpan.classList.add(styles.opponent);

            const currentTypeRed = piecesMap.get(notation.white[0])!;

            const pieceElementRed: PieceElement | undefined = piecesArray.find((element) => {
                if (element.figType == currentTypeRed && element.side == Side.White) {
                    return true;
                }
            });

            const imgRed = pieceElementRed?.element.cloneNode(true)! as HTMLImageElement;
            imgRed.width = 18;
            imgRed.height = 18;

            const redPiece = notation.white[0];
            const redOrigin = notation.white.slice(1, 3);
            const redDestination = notation.white.includes('x')
                ? notation.white.slice(4, 6)
                : notation.white.slice(3, 5);

            const redSpan = document.createElement('span');
            redSpan.append(imgRed, `${redOrigin} > ${redDestination} `);
            redSpan.classList.add(styles.player);

            li.append(blueSpan, document.createTextNode(' | '), redSpan);

            ol.append(li);
        });

        this.element.append(ol);
    }
}
