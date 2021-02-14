import { StringPieces } from '../domain/basicChessTypes';
export interface IGameStatsPresenter {
    readonly element: HTMLElement;
    updateCaptureTable(updateCapturedPieces: { white: StringPieces[]; black: StringPieces[] }): void;
    updatePreviousMoves(notationArray: { white: string; black: string; [key: string]: string }[]): void;
}
