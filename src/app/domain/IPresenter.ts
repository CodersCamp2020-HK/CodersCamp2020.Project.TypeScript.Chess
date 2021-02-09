import { Cord } from './basicChessTypes';
import { ChessBoardView } from '../domain/IChessBoard';

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

type OnHoverHandler = (cord: Readonly<Cord>) => void;
type OnClickHandler = (cord: Readonly<Cord>) => void;

export interface IChessBoardPresenter {
    render(chessBoard: ChessBoardView): void;
    markFields(fields: ReadonlyMovesWithDisplayType): void;
    clearMarkedFields(fields?: readonly Readonly<Cord>[]): void;
    onHover(callback: OnHoverHandler): void;
    onClick(callback: OnClickHandler): void;
}
