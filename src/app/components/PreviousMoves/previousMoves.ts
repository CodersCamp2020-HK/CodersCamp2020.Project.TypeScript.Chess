import styles from './previousMoves.module.scss';

interface Notation {
    white: string;
    black: string;
}

export class PreviousMoves {
    element = document.createElement('div');
    notationArray: Notation[];
    constructor(notationArray: Notation[]) {
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

            const blueSpan = document.createElement('span');
            blueSpan.textContent = `${notation.black[0]} ${notation.black.slice(1, 3)} > ${notation.black.slice(
                3,
                5,
            )} `;
            blueSpan.classList.add(styles.opponent);

            const redSpan = document.createElement('span');
            redSpan.textContent = `${notation.white[0]} ${notation.white.slice(1, 3)} > ${notation.white.slice(3, 5)}`;
            redSpan.classList.add(styles.player);

            li.append(blueSpan, document.createTextNode(' | '), redSpan);

            ol.append(li);
        });

        this.element.append(ol);
    }
}
