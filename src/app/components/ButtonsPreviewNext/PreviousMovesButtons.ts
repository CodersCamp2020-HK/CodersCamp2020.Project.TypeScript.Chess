import { Button } from '../genericButton/Button';

export class PreviousMovesButtons {
    private __element: HTMLElement;

    constructor(
        onHomeCb: () => void,
        onPreviousCb: () => void,
        onClickCb: () => void,
        onNextCb: () => void,
        onEndCb: () => void,
    ) {
        this.__element = document.createElement('div');

        const homeButton = new Button('<<', () => onHomeCb());
        homeButton.button.classList.add('homeButton', 'functionalButton');

        const previousButton = new Button('<', () => onPreviousCb());
        previousButton.button.classList.add('previousButton', 'functionalButton');

        const playButton = new Button('▷', () => onClickCb());
        playButton.button.classList.add('playButton', 'functionalButton');

        const nextButton = new Button('>', () => onNextCb());
        nextButton.button.classList.add('nextButton', 'functionalButton');

        const endButton = new Button('>>', () => onEndCb());
        endButton.button.classList.add('endButton', 'functionalButton');

        this.__element.append(
            homeButton.button,
            previousButton.button,
            playButton.button,
            nextButton.button,
            endButton.button,
        );
    }
    public get element(): HTMLElement {
        return this.__element;
    }
}
