import { Cord, Piece } from './basicChessTypes';

enum ChessBoardSquareDisplayType {
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

type ReadonlyChessBoardRepresentation = ReadonlyArray<ReadonlyArray<Readonly<Piece> | null>>;
type ReadonlyMovesWithDisplayType = ReadonlyArray<Readonly<CordWithDisplayType>>;

type OnHoverHandler = (cord: Readonly<Cord>) => void;
type OnClickHandler = (cord: Readonly<Cord>) => void;

export interface IChessBoardPresenter {
    render(chessBoard: ReadonlyChessBoardRepresentation): void;
    markFields(fields: ReadonlyMovesWithDisplayType): void;
    clearMarkedFields(fields?: readonly Readonly<Cord>[]): void;
    onHover(callback: OnHoverHandler): void;
    onClick(callback: OnClickHandler): void;
    onHoverEnabled: boolean;
    onClickEnabled: boolean;
}
