import styles from './previousMoves.module.scss';

interface Notation {
    white: string;
    black: string;
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

            const bluePiece = notation.black[0];
            const blueOrigin = notation.black.slice(1, 3);
            const blueDestination = notation.black.includes('x')
                ? notation.black.slice(4, 6)
                : notation.black.slice(3, 5);

            const blueSpan = document.createElement('span');
            blueSpan.textContent = `${bluePiece} ${blueOrigin} > ${blueDestination} `;
            blueSpan.classList.add(styles.opponent);

            const redPiece = notation.white[0];
            const redOrigin = notation.white.slice(1, 3);
            const redDestination = notation.white.includes('x')
                ? notation.white.slice(4, 6)
                : notation.white.slice(3, 5);

            const redSpan = document.createElement('span');
            redSpan.textContent = `${redPiece} ${redOrigin} > ${redDestination}`;
            redSpan.classList.add(styles.player);

            li.append(blueSpan, document.createTextNode(' | '), redSpan);

            ol.append(li);
        });

        this.element.append(ol);
    }
}
