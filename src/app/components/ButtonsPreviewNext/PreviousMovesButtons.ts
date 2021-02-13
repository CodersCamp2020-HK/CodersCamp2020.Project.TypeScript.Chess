import { Button } from '../genericButton/Button';
import styles from './PreviousMovesButtons.module.scss';
import homesvg from './svg/Home.svg';
import previoussvg from './svg/Previous.svg';
import playsvg from './svg/Play.svg';
import nextsvg from './svg/Next.svg';
import endsvg from './svg/End.svg';

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
        this.__element.classList.add(styles.functionalButtonsWrapper);

        const homeButton = new Button('', () => onHomeCb());
        homeButton.button.innerHTML = `<img src="${homesvg}"></img>`;
        homeButton.button.classList.add(styles.homeButton, styles.functionalButton);

        const previousButton = new Button(previoussvg, () => onPreviousCb());
        previousButton.button.innerHTML = `<img src="${previoussvg}"></img>`;
        previousButton.button.classList.add(styles.previousButton, styles.functionalButton);

        const playButton = new Button(playsvg, () => onClickCb());
        playButton.button.innerHTML = `<img src="${playsvg}"></img>`;
        playButton.button.classList.add(styles.playButton, styles.functionalButton);

        const nextButton = new Button(nextsvg, () => onNextCb());
        nextButton.button.innerHTML = `<img src="${nextsvg}"></img>`;
        nextButton.button.classList.add(styles.nextButton, styles.functionalButton);

        const endButton = new Button(endsvg, () => onEndCb());
        endButton.button.innerHTML = `<img src="${endsvg}"></img>`;
        endButton.button.classList.add(styles.endButton, styles.functionalButton);

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
