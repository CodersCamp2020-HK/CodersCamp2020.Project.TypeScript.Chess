import styles from './Game.module.scss';
import boardStyles from '../ChessBoard/chess.module.scss';
import { Aside } from '../Aside/Aside';
import rulesTxt from '../../../assets/rules.txt';
import infoTxt from '../../../assets/info.txt';
import { Label } from '../genericLabel/Label';
import { ChessBoardComponent } from '../ChessBoard/ChessBoardComponent';
import { ChessBoard } from '../../infrastructure/ChessBoard';
import { PieceType, Side } from '../../domain/basicChessTypes';
export class Game {
    private __element: HTMLElement;
    public chessboard: ChessBoardComponent | null = null;

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
        chessboardWrapper.classList.add(styles.wrapperChessboard, boardStyles.board__wrapper);
        //chessboardWrapper.textContent = 'Szachownica';
        this.chessboard = new ChessBoardComponent(
            chessboardWrapper,
            [{ element: document.createElement('div'), figType: PieceType.Bishop, side: Side.Black }],
            ChessBoard.createDefaultBoard().board,
        );

        const opponentScoreWrapper = document.createElement('div');
        opponentScoreWrapper.classList.add(styles.wrapperOpponent);
        const opponentLabel = new Label('blue', 'Opponent');
        opponentScoreWrapper.append(opponentLabel.element);

        const playerScoreWrapper = document.createElement('div');
        playerScoreWrapper.classList.add(styles.wrapperPlayer);
        const playerLabel = new Label('red', 'Player');
        playerScoreWrapper.append(playerLabel.element);

        const previousMovesWrapper = document.createElement('div');
        previousMovesWrapper.classList.add(styles.wrapperMoves);
        const movesLabel = new Label('yellow', 'previous moves');
        previousMovesWrapper.append(movesLabel.element);

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
