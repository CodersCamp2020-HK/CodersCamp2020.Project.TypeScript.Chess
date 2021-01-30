import { ChessBoardRepresentation, CordWithMoveType, PieceType, PossibleCords, Side } from '../domain/basicChessTypes';

export const displayChessboard = (chessboard: ChessBoardRepresentation): string => {
    const result: string[][] = [];
    for (const row of chessboard) {
        const pieceSymbol = new Map([
            [PieceType.Bishop, 'B '],
            [PieceType.King, 'K '],
            [PieceType.Knight, 'N '],
            [PieceType.Pawn, 'P '],
            [PieceType.Queen, 'Q '],
            [PieceType.Rook, 'R '],
        ]);
        result.push(
            row.map((cord) => {
                if (cord) {
                    const side = cord.side == Side.White ? ' w' : ' b';
                    return side + pieceSymbol.get(cord.figType);
                }
                return '    ';
            }) as string[],
        );
    }
    return `
    ${result[0]}
    ${result[1]}
    ${result[2]}
    ${result[3]}
    ${result[4]}
    ${result[5]}
    ${result[6]}
    ${result[7]}`;
};

export const displayMoves = (moves: CordWithMoveType[] | PossibleCords[]): string => {
    const result: string[] = [];
    for (const move of moves) {
        result.push(JSON.stringify(move).padStart(36));
    }
    return '\n' + result.join('\n');
};
