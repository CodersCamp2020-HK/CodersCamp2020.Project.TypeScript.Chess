export class Game {
    private __gameWrapper: HTMLDivElement;

    constructor() {
        this.__gameWrapper = document.createElement('div');
        this.__gameWrapper.classList.add('wrapper__chess-game');
    }

    public get gameWrapper(): HTMLDivElement {
        return this, this.__gameWrapper;
    }

    createGameDiv(): void {
        const cyberChessTextWrapper = document.createElement('div');
        cyberChessTextWrapper.textContent = 'Cyber Chess';

        const chessboardWrapper = document.createElement('div');
        chessboardWrapper.textContent = 'Szachownica';

        const opponentScoreWrapper = document.createElement('div');
        opponentScoreWrapper.textContent = 'Nazwa, czas przeciwnika, zbite pionki';

        const playerScoreWrapper = document.createElement('div');
        opponentScoreWrapper.textContent = 'Nazwa, czas gracza, zbite pionki';

        const previousMovesWrapper = document.createElement('div');
        previousMovesWrapper.textContent = 'Poprzednie ruchy';

        const quitButtonWrapper = document.createElement('div');
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
