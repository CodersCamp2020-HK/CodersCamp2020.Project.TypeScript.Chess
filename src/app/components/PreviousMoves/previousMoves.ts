import styles from './previousMoves.module.scss';
import { piecesArray } from '../PiecesElements/piecesElements';
import { PieceElement } from '../ChessBoard/ChessBoardComponent';
import { Side, PieceType } from '../../domain/basicChessTypes';
import { opponent } from '../game/capturedTable/CapturedTable.module.scss';

interface Notation {
    white: string;
    black: string;
    [key: string]: string;
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
                ['K', PieceType.King],
                ['Q', PieceType.Queen],
                ['R', PieceType.Rook],
                ['B', PieceType.Bishop],
                ['N', PieceType.Knight],
                ['P', PieceType.Pawn],
            ]);

            const actionsMap = new Map([
                ['x', 'Bicie'],
                ['+', 'Szach'],
                ['#', 'Mat'],
            ]);

            for (const color in notation) {
                const sideColor = color == 'white' ? Side.White : Side.Black;
                const currentClassName = color == 'white' ? 'player' : 'opponent';

                const span = document.createElement('span');

                if (notation[color] == '0-0') {
                    span.textContent = 'Roszada';
                    span.classList.add(styles[currentClassName]);
                    li.append(span);
                    continue;
                }

                if (notation[color] == '0-0-0') {
                    span.textContent = 'Długa roszada';
                    span.classList.add(styles[currentClassName]);
                    li.append(span);
                    continue;
                }

                const pieceAbbreviation: string = notation[color][0];
                const currentFigType = piecesMap.get(pieceAbbreviation);
                const pieceOrigin = notation[color].slice(1, 3);
                const pieceDestination = notation[color].slice(3, 5);

                const pieceElement: PieceElement | undefined = piecesArray.filter((element) => {
                    if (element.figType == currentFigType && element.side == sideColor) {
                        return true;
                    }
                })[0];

                const pieceImage = pieceElement.element.cloneNode(true) as HTMLImageElement;
                pieceImage.classList.add(styles.pieceImage);

                span.append(pieceImage, `${pieceOrigin} > ${pieceDestination} `);
                span.classList.add(styles[currentClassName]);

                for (const action of actionsMap.keys()) {
                    if (notation[color].includes(action)) {
                        const currentAction = actionsMap.get(action) as string;
                        span.append(currentAction + ' ');
                    }
                }

                li.append(span);
            }

            li.insertBefore(document.createTextNode(' | '), li.lastChild);
            //`${bluePiece} ${blueOrigin} > ${blueDestination} `

            ol.append(li);
        });

        this.element.append(ol);
    }
}
