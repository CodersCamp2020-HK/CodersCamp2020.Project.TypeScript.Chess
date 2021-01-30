import styles from './Game.module.scss';
import { Aside } from '../Aside/Aside';
import rulesTxt from '../../../assets/rules.txt';
import infoTxt from '../../../assets/info.txt';
import { Timer } from '../timer/Timer';

export class Game {
    private __element: HTMLElement;

    constructor() {
        this.__element = this.createGameWrapper();
    }

    public get element(): HTMLElement {
        return this.__element;
    }

    private createGameWrapper(): HTMLElement {
        const container = document.createElement('div');
        container.classList.add(styles.container);

        const wrapper = document.createElement('div');
        wrapper.classList.add(styles.wrapper);

        const rules = new Aside('Rules', 'left', rulesTxt);
        const info = new Aside('Info', 'right', infoTxt);

        const cyberChessTextWrapper = document.createElement('div');
        cyberChessTextWrapper.classList.add(styles.wrapperText);
        cyberChessTextWrapper.textContent = 'Cyber Chess';

        const chessboardWrapper = document.createElement('div');
        chessboardWrapper.classList.add(styles.wrapperChessboard);
        chessboardWrapper.textContent = 'Szachownica';

        const opponentScoreWrapper = document.createElement('div');
        opponentScoreWrapper.classList.add(styles.wrapperOpponent);
        opponentScoreWrapper.textContent = 'Nazwa przeciwnika, czas przeciwnika, zbite pionki';

        const playerScoreWrapper = document.createElement('div');
        playerScoreWrapper.classList.add(styles.wrapperPlayer);
        playerScoreWrapper.textContent = 'Nazwa gracza, czas gracza, zbite pionki';
        const timer = new Timer(10, 2, () => {
            console.log('gxdgdsgds');
        });
        playerScoreWrapper.appendChild(timer.element);
        timer.start();
        setTimeout(() => {
            timer.stop();
        }, 3000);
        setTimeout(() => {
            timer.start();
        }, 2000);

        const previousMovesWrapper = document.createElement('div');
        previousMovesWrapper.classList.add(styles.wrapperMoves);
        previousMovesWrapper.textContent = 'Poprzednie ruchy';

        const quitButtonWrapper = document.createElement('div');
        quitButtonWrapper.classList.add(styles.wrapperQuit);
        quitButtonWrapper.textContent = 'Wyjście z gry';

        const footerWrapper = document.createElement('div');
        footerWrapper.classList.add(styles.wrapperFooter);
        footerWrapper.textContent = 'Coders Camp';

        wrapper.append(
            chessboardWrapper,
            opponentScoreWrapper,
            playerScoreWrapper,
            previousMovesWrapper,
            quitButtonWrapper,
        );
        container.append(rules.element, info.element, cyberChessTextWrapper, wrapper, footerWrapper);

        return container;
    }
}
