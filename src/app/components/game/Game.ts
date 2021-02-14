import styles from './Game.module.scss';
import boardStyles from '../ChessBoard/chess.module.scss';
import { Aside } from '../Aside/Aside';
import rulesTxt from '../../../assets/rules.txt';
import infoTxt from '../../../assets/info.txt';
import { InfoContent, RulesContent } from '../sidebars/sidebars';
import { CapturedTable } from './capturedTable/CapturedTable';
import { Header } from '../HeaderCyberChess/Header';
import { Label } from '../genericLabel/Label';
import { Footer } from '../footer/Footer';
import { Button } from '../genericButton/Button';
import { PreviousMovesButtons } from '../ButtonsPreviewNext/PreviousMovesButtons';
import { ModalGameOver } from '../modalGameOver/ModalGameOver';
import { Side } from '../../domain/basicChessTypes';
export class Game {
    private __element: HTMLElement;

    constructor(public readonly gameBoardView: HTMLElement, public readonly gameStatsView: HTMLElement) {
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

        const rules = new Aside('Rules', 'left', new RulesContent().element);
        const info = new Aside('Info', 'right', new InfoContent().element);

        const cyberChessTextWrapper = document.createElement('div');
        cyberChessTextWrapper.classList.add(styles.wrapperText);
        const header = new Header();
        cyberChessTextWrapper.append(header.element);
        // cyberChessTextWrapper.textContent = 'Cyber Chess';

        // const opponentScoreWrapper = document.createElement('div');
        // opponentScoreWrapper.classList.add(styles.wrapperOpponent);
        // const opponentCapturedTable = new CapturedTable('opponent', ['queen']);
        // const opponentLabel = new Label('blue', 'Opponent');
        // opponentScoreWrapper.append(opponentLabel.element);
        // opponentScoreWrapper.append(opponentCapturedTable.element);

        // const playerScoreWrapper = document.createElement('div');
        // playerScoreWrapper.classList.add(styles.wrapperPlayer);
        // const playerCapturedTable = new CapturedTable('player', []);
        // const playerLabel = new Label('red', 'Player');
        // playerScoreWrapper.append(playerLabel.element);
        // playerScoreWrapper.append(playerCapturedTable.element);

        // const previousMovesWrapper = document.createElement('div');
        // previousMovesWrapper.classList.add(styles.wrapperMoves);
        // const movesLabel = new Label('yellow', 'previous moves');
        // previousMovesWrapper.append(movesLabel.element);
        // const quitButtonWrapper = document.createElement('div');
        // const fun = () => {
        //     console.log(`x`);
        // };
        // const previousMovesButtons = new PreviousMovesButtons(fun, fun, fun, fun, fun);
        // quitButtonWrapper.classList.add(styles.wrapperQuit);
        // const quitButton = new Button(
        //     'QUIT',
        //     function () {
        //         console.log('animated button');
        //     },
        //     true,
        // );
        // quitButtonWrapper.append(previousMovesButtons.element, quitButton.button);

        const footerWrapper = document.createElement('div');
        footerWrapper.classList.add(styles.wrapperFooter);
        const footerImage = new Footer();
        footerWrapper.appendChild(footerImage.element);
        // const modalPromotion = new ModalPromotion(Side.Black);

        wrapper.append(
            this.gameBoardView,
            // opponentScoreWrapper,
            // playerScoreWrapper,
            // previousMovesWrapper,
            // quitButtonWrapper,
            this.gameStatsView,
        );

        container.append(
            rules.element,
            info.element,
            cyberChessTextWrapper,
            wrapper,
            footerWrapper,
            // modalPromotion.element,
        );

        return container;
    }
}
