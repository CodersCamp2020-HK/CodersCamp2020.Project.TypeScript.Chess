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

            const blueSpan = document.createElement('span');
            blueSpan.textContent = `${notation.black[0]} ${notation.black.slice(1, 3)} ->${notation.black.slice(
                3,
                5,
            )} `;

            const redSpan = document.createElement('span');
            redSpan.textContent = `${notation.white[0]} ${notation.white.slice(1, 3)} -> ${notation.white.slice(3, 5)}`;

            li.innerHTML = blueSpan.innerHTML + ' | ' + redSpan.innerHTML;

            ol.append(li);
        });

        this.element.append(ol);
    }
}
