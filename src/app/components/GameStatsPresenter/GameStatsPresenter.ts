import { IGameStatsPresenter } from '../../domain/IGameStatsPresenter';
import styles from './GameStatsPresenter.module.scss';
import { CapturedTable } from '../game/capturedTable/CapturedTable';
import { Label } from '../genericLabel/Label';
import { PreviousMovesButtons } from '../ButtonsPreviewNext/PreviousMovesButtons';
import { Button } from '../genericButton/Button';
import { Side, StringPieces } from '../../domain/basicChessTypes';
import { ModalGameOver } from '../modalGameOver/ModalGameOver';
import { ModalPromotion } from '../game/modalPromotionPawn/ModalPromotion';
import { PreviousMoves } from '../PreviousMoves/previousMoves';

export class GameStatsPresenter implements IGameStatsPresenter {
    private gameStatsWrapper: HTMLElement;
    private opponentCapturedTable;
    private playerCapturedTable;
    private previousMoves = new PreviousMoves([]);
    constructor() {
        const modalPromotion = new ModalPromotion(Side.Black);
        this.gameStatsWrapper = document.createElement('div');
        this.gameStatsWrapper.classList.add(styles.wrapperGameStats);

        const opponentScoreWrapper = document.createElement('div');
        const opponentLabel = new Label('blue', 'Opponent');
        this.opponentCapturedTable = new CapturedTable('opponent', []);
        opponentScoreWrapper.appendChild(opponentLabel.element);
        opponentScoreWrapper.appendChild(this.opponentCapturedTable.element);

        const playerScoreWrapper = document.createElement('div');
        this.playerCapturedTable = new CapturedTable('player', []);
        const playerLabel = new Label('red', 'Player');
        playerScoreWrapper.append(playerLabel.element);
        playerScoreWrapper.append(this.playerCapturedTable.element);

        const previousMovesWrapper = document.createElement('div');
        const movesLabel = new Label('yellow', 'previous moves');
        previousMovesWrapper.append(movesLabel.element, this.previousMoves.element);

        const quitButtonWrapper = document.createElement('div');
        const fun = () => {
            console.log(`x`);
        };
        const previousMovesButtons = new PreviousMovesButtons(fun, fun, fun, fun, fun);
        const quitButton = new Button(
            'QUIT',
            function () {
                console.log('animated button');
            },
            true,
        );
        quitButtonWrapper.append(previousMovesButtons.element, quitButton.button);

        const modalGameOver = new ModalGameOver(Side.White, 43, '2:45', 'time control', 'Ania', 'Mateusz', fun, fun);

        this.gameStatsWrapper.append(
            opponentScoreWrapper,
            playerScoreWrapper,
            previousMovesWrapper,
            quitButtonWrapper,
            modalPromotion.element,
            modalGameOver.element,
        );
    }

    updateCaptureTable(updateCapturedPieces: { white: StringPieces[]; black: StringPieces[] }): void {
        this.opponentCapturedTable.update(updateCapturedPieces.black);
        this.playerCapturedTable.update(updateCapturedPieces.white);
    }

    updatePreviousMoves(notationArray: { white: string; black: string; [key: string]: string }[]): void {
        this.previousMoves.render(notationArray);
    }

    get element(): HTMLElement {
        return this.gameStatsWrapper;
    }
}
