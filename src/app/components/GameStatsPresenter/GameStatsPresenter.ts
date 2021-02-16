import { IGameStatsPresenter } from '../../domain/IGameStatsPresenter';
import styles from './GameStatsPresenter.module.scss';
import { CapturedTable } from '../game/capturedTable/CapturedTable';
import { Label } from '../genericLabel/Label';
import { PreviousMovesButtons } from '../ButtonsPreviewNext/PreviousMovesButtons';
import { Button } from '../genericButton/Button';
import { PieceType, Side, StringPieces } from '../../domain/basicChessTypes';
import { ModalGameOver } from '../modalGameOver/ModalGameOver';
import { ModalPromotion } from '../game/modalPromotionPawn/ModalPromotion';
import { PreviousMoves } from '../PreviousMoves/previousMoves';
import { Timer } from '../timer/Timer';
import { ModalQuit } from '../game/modalQuit/ModalQuit';
import { StartGameParams } from '../MainMenu/MainMenu';

export class GameStatsPresenter implements IGameStatsPresenter {
    private gameStatsWrapper: HTMLElement;
    private opponentCapturedTable;
    private playerCapturedTable;
    private previousMoves = new PreviousMoves([]);
    private modalPromotionBlack;
    private modalPromotionWhite;
    timerWhite: Timer;
    timerBlack: Timer;
    // private modalQuit = new ModalQuit(() => console.log('modal'));
    constructor(startGameParams: StartGameParams, addedTimeInSec: number) {
        const oponentName = startGameParams.playerName1;
        const playerName = startGameParams.playerName2;
        const gameTimeInSec = startGameParams.timePerPlayerSeconds;
        this.timerWhite = new Timer(gameTimeInSec, addedTimeInSec);
        this.timerWhite.element.classList.add(styles.timerPlayer);
        this.timerBlack = new Timer(gameTimeInSec, addedTimeInSec);
        this.timerBlack.element.classList.add(styles.timerOpponent);

        this.gameStatsWrapper = document.createElement('div');
        this.gameStatsWrapper.classList.add(styles.wrapperGameStats);
        this.modalPromotionWhite = new ModalPromotion(Side.White);
        this.modalPromotionBlack = new ModalPromotion(Side.Black);

        const opponentScoreWrapper = document.createElement('div');
        const opponentLabel = new Label('blue', oponentName);
        this.opponentCapturedTable = new CapturedTable('opponent', []);
        opponentScoreWrapper.classList.add(styles.opponentScoreWrapper);
        opponentScoreWrapper.appendChild(opponentLabel.element);
        opponentScoreWrapper.appendChild(this.opponentCapturedTable.element);
        opponentScoreWrapper.appendChild(this.timerBlack.element);

        const playerScoreWrapper = document.createElement('div');
        this.playerCapturedTable = new CapturedTable('player', []);
        const playerLabel = new Label('red', playerName);
        playerScoreWrapper.classList.add(styles.playerScoreWrapper);
        playerScoreWrapper.append(playerLabel.element);
        playerScoreWrapper.append(this.playerCapturedTable.element);
        playerScoreWrapper.append(this.timerWhite.element);

        const previousMovesWrapper = document.createElement('div');
        const movesLabel = new Label('yellow', 'previous moves');
        previousMovesWrapper.classList.add(styles.previousMovesWrapper);
        previousMovesWrapper.append(movesLabel.element, this.previousMoves.element);

        const quitButtonWrapper = document.createElement('div');
        const fun = () => {
            console.log(`x`);
        };
        const previousMovesButtons = new PreviousMovesButtons(fun, fun, fun, fun);

        const quitBtn = new Button(
            'Quit',
            () => {
                const modalQuit = new ModalQuit(() => console.log('eluwinka w śrdodki'));
                this.gameStatsWrapper.appendChild(modalQuit.element);
            },
            // eslint-disable-next-line prettier/prettier
            true);

        this.gameStatsWrapper.append(
            opponentScoreWrapper,
            playerScoreWrapper,
            previousMovesWrapper,
            this.modalPromotionBlack.element,
            this.modalPromotionWhite.element,
            quitBtn.button,
        );
    }

    updateCaptureTable(updateCapturedPieces: { white: StringPieces[]; black: StringPieces[] }): void {
        this.opponentCapturedTable.update(updateCapturedPieces.black);
        this.playerCapturedTable.update(updateCapturedPieces.white);
    }

    updatePreviousMoves(notationArray: { white: string; black: string; [key: string]: string }[]): void {
        this.previousMoves.render(notationArray);
    }
    openPromotionModal(side: Side, onClick: (piece: PieceType) => void): string {
        side === Side.White ? this.modalPromotionWhite.openModal(onClick) : this.modalPromotionBlack.openModal(onClick);
        return side === Side.White ? this.modalPromotionWhite.pieceChosen : this.modalPromotionBlack.pieceChosen;
    }

    startTimer(side: Side, onTimerEndCb: () => void): void {
        side === Side.White ? this.timerWhite.start(onTimerEndCb) : this.timerBlack.start(onTimerEndCb);
    }

    stopTimer(side: Side): void {
        side === Side.White ? this.timerWhite.stop() : this.timerBlack.stop();
    }

    getRemainingTime(side: Side): number {
        return side === Side.White ? this.timerWhite.remainingTime : this.timerBlack.remainingTime;
    }

    openModal(
        winnerSide: Side,
        numberOfMoves: number,
        time: number,
        winWay: string,
        namePlayer: string,
        nameOpponent: string,
        onMainMenuCb: () => void,
        onPlayAgainCb: () => void,
    ): void {
        const modal = new ModalGameOver(
            winnerSide,
            numberOfMoves,
            time,
            winWay,
            namePlayer,
            nameOpponent,
            onMainMenuCb,
            onPlayAgainCb,
        );
        this.gameStatsWrapper.appendChild(modal.element);
        modal.openModal();
    }

    createPreviousButtons(
        onHomeCb: () => void,
        onPreviousCb: () => void,
        onNextCb: () => void,
        onEndCb: () => void,
    ): void {
        const previousMovesButtons = new PreviousMovesButtons(onHomeCb, onPreviousCb, onNextCb, onEndCb);
        this.gameStatsWrapper.append(previousMovesButtons.element);
    }

    get element(): HTMLElement {
        return this.gameStatsWrapper;
    }
}
