import { IChessBoard, PieceType, Side } from '../domain/basicChessTypes';

export const getCapturedPieceCount = (
    side: Side,
    boardState: IChessBoard,
): Map<
    PieceType,
    {
        startingCount: number;
        actualCount: number;
        name: string;
    }
> => {
    const pieceMap = new Map([
        [PieceType.Pawn, { startingCount: 8, actualCount: 0, name: 'pawn' }],
        [PieceType.Rook, { startingCount: 2, actualCount: 0, name: 'rook' }],
        [PieceType.Knight, { startingCount: 2, actualCount: 0, name: 'knight' }],
        [PieceType.Bishop, { startingCount: 2, actualCount: 0, name: 'bishop' }],
        [PieceType.Queen, { startingCount: 1, actualCount: 0, name: 'queen' }],
        [PieceType.King, { startingCount: 1, actualCount: 0, name: 'king' }],
    ]);

    for (const row of boardState.board) {
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

export const getCapturedPieceNames = (side: Side, boardState: IChessBoard): string[] => {
    const result = [];
    for (let i = 0; i < 6; i++) {
        const pieceCount = getCapturedPieceCount(side, boardState);
        const piece = pieceCount.get(i);
        if (piece) {
            for (let j = piece.actualCount; j < piece.startingCount; j++) {
                result.push(piece.name);
            }
        }
    }

    return result;
};
