import { Cord } from './basicChessTypes';
import { ChessBoardView } from './IChessBoard';
import { Side } from './basicChessTypes';

export enum ChessBoardSquareDisplayType {
    Normal,
    Move,
    Selected,
    Capture,
    Castling,
    EnPassant,
    Promotion,
    Checkmate,
    Check,
    Stealemate,
}

export interface CordWithDisplayType extends Cord {
    display: ChessBoardSquareDisplayType;
}

export type ReadonlyMovesWithDisplayType = ReadonlyArray<Readonly<CordWithDisplayType>>;
export interface IChessBoardPresenter {
    readonly element: HTMLElement;
    render(chessBoard: ChessBoardView): void;
    markFields(fields: ReadonlyMovesWithDisplayType, side: Side): void;
    clearMarkedFields(fields?: readonly Readonly<Cord>[]): void;
    setDangerColor(): void;
    unsetDangerColor(): void;
}
