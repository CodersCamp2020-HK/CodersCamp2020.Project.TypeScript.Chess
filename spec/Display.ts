import {
    ChessBoardRepresentation,
    CordWithMoveType,
    Piece,
    PieceType,
    PossibleCords,
    Side,
} from '../src/app/domain/basicChessTypes';

export const convertEmojiToRep = (emojiBoard: string[][]) => {
    const result: ChessBoardRepresentation = [[], [], [], [], [], [], [], []];
    const emojis = new Map([
        ['♟️', { figType: PieceType.Pawn, side: Side.Black }],
        ['♙', { figType: PieceType.Pawn, side: Side.White }],
        ['♝', { figType: PieceType.Bishop, side: Side.Black }],
        ['♗', { figType: PieceType.Bishop, side: Side.White }],
        ['♞', { figType: PieceType.Knight, side: Side.Black }],
        ['♘', { figType: PieceType.Knight, side: Side.White }],
        ['♜', { figType: PieceType.Rook, side: Side.Black }],
        ['♖', { figType: PieceType.Rook, side: Side.White }],
        ['♛', { figType: PieceType.Queen, side: Side.Black }],
        ['♕', { figType: PieceType.Queen, side: Side.White }],
        ['♚', { figType: PieceType.King, side: Side.Black }],
        ['♔', { figType: PieceType.King, side: Side.White }],
    ]);
    for (let x = 0; x < emojiBoard.length; x++) {
        for (let y = 0; y < emojiBoard[0].length; y++) {
            const square = emojiBoard[x][y];
            if (square == '.') {
                result[x][y] = null;
            } else {
                const emoji = emojis.get(square);
                if (emoji !== undefined) {
                    const { figType, side } = emoji;
                    let isMoved;
                    if (PieceType.King === figType) {
                        const blackKingCond = x == 0 && y == 4 && side == Side.Black;
                        const whiteKingCond = x == 7 && y == 4 && side == Side.White;
                        isMoved = blackKingCond || whiteKingCond ? true : false;
                    } else if (PieceType.Pawn === figType) {
                        const blackPawnCond = x == 1 && side == Side.Black;
                        const whitePawnCond = x == 6 && side == Side.White;
                        isMoved = blackPawnCond || whitePawnCond ? true : false;
                    } else {
                        isMoved = true;
                    }
                    result[x].push({ figType, cord: { x, y }, side, isMoved } as Piece);
                }
            }
        }
    }
    return result;
};

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
