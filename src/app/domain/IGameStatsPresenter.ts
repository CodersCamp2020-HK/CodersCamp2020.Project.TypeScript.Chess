import { StringPieces } from '../domain/basicChessTypes';
export interface IGameStatsPresenter {
    readonly element: HTMLElement;
    updateCaptureTable(updateCapturedPieces: { white: StringPieces[]; black: StringPieces[] }): void;
}
