import { CordWithMoveType, MoveType } from '../domain/basicChessTypes';
import { ChessBoardSquareDisplayType, CordWithDisplayType, ReadonlyMovesWithDisplayType } from '../domain/IPresenter';

export const convertMovesToDisplayType = (moves: CordWithMoveType[]): ReadonlyMovesWithDisplayType => {
    const moveTypeToDisplayType = new Map([
        [MoveType.NormalMove, ChessBoardSquareDisplayType.Normal],
        [MoveType.Capture, ChessBoardSquareDisplayType.Capture],
        [MoveType.Castling, ChessBoardSquareDisplayType.Castling],
        [MoveType.Promotion, ChessBoardSquareDisplayType.Promotion],
        [MoveType.EnPassant, ChessBoardSquareDisplayType.EnPassant],
    ]);
    const result: Array<CordWithDisplayType> = [];
    moves.forEach((move) => {
        if (move) {
            const displayType = moveTypeToDisplayType.get(move.moveType);
            if (displayType) result.push({ x: move.x, y: move.y, display: displayType });
        }
    });
    return result;
};
