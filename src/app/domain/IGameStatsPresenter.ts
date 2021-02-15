import { PieceType, Side, StringPieces } from '../domain/basicChessTypes';
export interface IGameStatsPresenter {
    readonly element: HTMLElement;
    updateCaptureTable(updateCapturedPieces: { white: StringPieces[]; black: StringPieces[] }): void;
    updatePreviousMoves(notationArray: { white: string; black: string; [key: string]: string }[]): void;
    openPromotionModal(side: Side, onClick: (piece: PieceType) => void): string;
    startTimer(side: Side, onTimerEndCb: () => void): void;
    stopTimer(side: Side): void;
    getRemainingTime(side: Side): number;
    openModal(
        winnerSide: Side,
        numberOfMoves: number,
        time: number,
        winWay: string,
        namePlayer: string,
        nameOpponent: string,
        onMainMenuCb: () => void,
        onPlayAgainCb: () => void,
    ): void;
    createPreviousButtons(
        onHomeCb: () => void,
        onPreviousCb: () => void,
        onClickCb: () => void,
        onNextCb: () => void,
        onEndCb: () => void,
    ): void;
}
