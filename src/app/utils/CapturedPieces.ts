import { PieceType, Side, StringPieces } from '../domain/basicChessTypes';
import { ChessBoardView } from '../domain/IChessBoard';

export const getCapturedPieceCount = (
    side: Side,
    boardState: ChessBoardView,
): Map<
    PieceType,
    {
        startingCount: number;
        actualCount: number;
        name: string;
    }
> => {
    const pieceMap: Map<
        PieceType,
        {
            startingCount: number;
            actualCount: number;
            name: StringPieces;
        }
    > = new Map([
        [PieceType.Pawn, { startingCount: 8, actualCount: 0, name: 'pawn' }],
        [PieceType.Rook, { startingCount: 2, actualCount: 0, name: 'rook' }],
        [PieceType.Knight, { startingCount: 2, actualCount: 0, name: 'knight' }],
        [PieceType.Bishop, { startingCount: 2, actualCount: 0, name: 'bishop' }],
        [PieceType.Queen, { startingCount: 1, actualCount: 0, name: 'queen' }],
        [PieceType.King, { startingCount: 1, actualCount: 0, name: 'king' }],
    ]);

    for (const row of boardState) {
        for (const square of row) {
            if (square !== null) {
                const piece = pieceMap.get(square.figType);
                if (piece) {
                    if (square.side == side) {
                        piece.actualCount++;
                    }
                }
            }
        }
    }
    return pieceMap;
};

export const getCapturedPieceNames = (side: Side, boardState: ChessBoardView): StringPieces[] => {
    const result: StringPieces[] = [];
    for (let i = 0; i < 6; i++) {
        const pieceCount = getCapturedPieceCount(side, boardState);
        const piece = pieceCount.get(i);
        if (piece) {
            for (let j = piece.actualCount; j < piece.startingCount; j++) {
                result.push(piece.name as StringPieces);
            }
        }
    }

    return result;
};
