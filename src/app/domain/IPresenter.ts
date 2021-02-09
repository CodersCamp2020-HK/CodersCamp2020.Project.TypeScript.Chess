import { Cord } from './basicChessTypes';
import { ChessBoardView } from './IChessBoard';

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

interface CordWithDisplayType extends Cord {
    display: ChessBoardSquareDisplayType;
}

export type ReadonlyMovesWithDisplayType = ReadonlyArray<Readonly<CordWithDisplayType>>;
export type OnHoverHandler = (cord: Readonly<Cord>) => void;
export type OnClickHandler = (cord: Readonly<Cord>) => void;

export interface IChessBoardPresenter {
    readonly element: HTMLElement;
    render(chessBoard: ChessBoardView): void;
    markFields(fields: ReadonlyMovesWithDisplayType): void;
    clearMarkedFields(fields?: readonly Readonly<Cord>[]): void;
    onHover(callback: OnHoverHandler): void;
    onClick(callback: OnClickHandler): void;
}
