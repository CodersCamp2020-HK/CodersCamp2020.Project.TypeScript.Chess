import { Button } from '../genericButton/Button';

export class PreviousMovesButtons {
    private __element: HTMLElement;

    constructor() {
        this.__element = document.createElement('div');

        const homeButton = new Button('<<', function () {
            console.log('homeButton');
        });
        homeButton.button.classList.add('homeButton', 'functionalButton');

        const previousButton = new Button('<', function () {
            console.log('previousButton');
        });
        previousButton.button.classList.add('previousButton', 'functionalButton');

        const playButton = new Button('▷', function () {
            console.log('playButton');
        });
        playButton.button.classList.add('playButton', 'functionalButton');

        const nextButton = new Button('>', function () {
            console.log('nextButton');
        });
        nextButton.button.classList.add('nextButton', 'functionalButton');

        const endButton = new Button('>>', function () {
            console.log('endButton');
        });
        endButton.button.classList.add('endButton', 'functionalButton');

        this.__element.append(
            homeButton.button,
            previousButton.button,
            playButton.button,
            nextButton.button,
            endButton.button,
        );
    }
    public get functionalButton(): HTMLElement {
        return this.__element;
    }
}
