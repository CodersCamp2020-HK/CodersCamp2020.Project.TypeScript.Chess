import styles from './Game.module.scss';

export class Game {
    private __gameWrapper: HTMLDivElement;

    constructor() {
        this.__gameWrapper = document.createElement('div');
        this.__gameWrapper.classList.add(styles.wrapper);
    }

    public get gameWrapper(): HTMLDivElement {
        return this, this.__gameWrapper;
    }

    createGameDiv(): void {
        const cyberChessTextWrapper = document.createElement('div');
        cyberChessTextWrapper.classList.add(styles.wrapper__text);
        cyberChessTextWrapper.textContent = 'Cyber Chess';

        const chessboardWrapper = document.createElement('div');
        chessboardWrapper.classList.add(styles.wrapper__chessboard);
        chessboardWrapper.textContent = 'Szachownica';

        const opponentScoreWrapper = document.createElement('div');
        opponentScoreWrapper.classList.add(styles.wrapper__opponent);
        opponentScoreWrapper.textContent = 'Nazwa, czas przeciwnika, zbite pionki';

        const playerScoreWrapper = document.createElement('div');
        playerScoreWrapper.classList.add(styles.wrapper__player);
        playerScoreWrapper.textContent = 'Nazwa, czas gracza, zbite pionki';

        const previousMovesWrapper = document.createElement('div');
        previousMovesWrapper.classList.add(styles.wrapper__moves);
        previousMovesWrapper.textContent = 'Poprzednie ruchy';

        const quitButtonWrapper = document.createElement('div');
        quitButtonWrapper.classList.add(styles.wrapper__quit);
        quitButtonWrapper.textContent = 'Wyjście z gry';

        this.__gameWrapper.append(
            cyberChessTextWrapper,
            chessboardWrapper,
            opponentScoreWrapper,
            playerScoreWrapper,
            previousMovesWrapper,
            quitButtonWrapper,
        );
    }
}
