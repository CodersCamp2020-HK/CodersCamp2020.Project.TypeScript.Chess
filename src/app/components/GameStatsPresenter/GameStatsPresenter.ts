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

export class GameStatsPresenter implements IGameStatsPresenter {
    private gameStatsWrapper: HTMLElement;
    private opponentCapturedTable;
    private playerCapturedTable;
    private previousMoves = new PreviousMoves([]);
    private modalPromotionBlack;
    private modalPromotionWhite;
    timerWhite: Timer;
    timerBlack: Timer;
    constructor(gameTimeInSec: number, addedTimeInSec: number) {
        this.timerWhite = new Timer(gameTimeInSec, addedTimeInSec);
        this.timerBlack = new Timer(gameTimeInSec, addedTimeInSec);

        this.gameStatsWrapper = document.createElement('div');
        this.gameStatsWrapper.classList.add(styles.wrapperGameStats);
        this.modalPromotionWhite = new ModalPromotion(Side.White);
        this.modalPromotionBlack = new ModalPromotion(Side.Black);

        const opponentScoreWrapper = document.createElement('div');
        const opponentLabel = new Label('blue', 'Opponent');
        this.opponentCapturedTable = new CapturedTable('opponent', []);
        opponentScoreWrapper.classList.add(styles.opponentScoreWrapper);
        opponentScoreWrapper.appendChild(opponentLabel.element);
        opponentScoreWrapper.appendChild(this.opponentCapturedTable.element);

        const playerScoreWrapper = document.createElement('div');
        this.playerCapturedTable = new CapturedTable('player', []);
        const playerLabel = new Label('red', 'Player');
        playerScoreWrapper.classList.add(styles.playerScoreWrapper);
        playerScoreWrapper.append(playerLabel.element);
        playerScoreWrapper.append(this.playerCapturedTable.element);

        const previousMovesWrapper = document.createElement('div');
        const movesLabel = new Label('yellow', 'previous moves');
        previousMovesWrapper.classList.add(styles.previousMovesWrapper);
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

        quitButtonWrapper.classList.add(styles.quitButtonWrapper);
        const modalGameOver = new ModalGameOver(Side.White, 43, '2:45', 'time control', 'Ania', 'Mateusz', fun, fun);


        this.gameStatsWrapper.append(
            opponentScoreWrapper,
            this.timerBlack.element,
            playerScoreWrapper,
            this.timerWhite.element,
            previousMovesWrapper,
            quitButtonWrapper,
            this.modalPromotionBlack.element,
            this.modalPromotionWhite.element,
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

    createPreviousButtons(fun: () => void): void {
        const previousMovesButtons = new PreviousMovesButtons(fun, fun, fun, fun, fun);
        this.gameStatsWrapper.appendChild(previousMovesButtons.element);
    }

    get element(): HTMLElement {
        return this.gameStatsWrapper;
    }
}
