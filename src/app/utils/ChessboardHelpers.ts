import { Piece, PieceType, Side } from '../domain/basicChessTypes';

type ChessBoardRepresentation = Array<Array<Piece | null>>;

export const generateDeafultChessboard = (): ChessBoardRepresentation => {
    const result: ChessBoardRepresentation = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ];
    const whitePawns: Piece[] = [];
    const blackPawns: Piece[] = [];
    const pieces = [PieceType.Rook, PieceType.Knight, PieceType.Bishop, PieceType.Queen];

    for (let i = 0; i < 8; i++) {
        whitePawns.push({
            figType: PieceType.Pawn,
            cord: { x: 6, y: i },
            side: Side.White,
            isMoved: false,
        } as Piece);
        blackPawns.push({
            figType: PieceType.Pawn,
            cord: { x: 1, y: i },
            side: Side.Black,
            isMoved: false,
        } as Piece);
    }

    for (let i = 0; i < 4; i++) {
        result[0][i] = { figType: pieces[i], cord: { x: 0, y: i }, side: Side.Black, isMoved: false } as Piece;
        result[0][7 - i] = { figType: pieces[i], cord: { x: 0, y: 7 - i }, side: Side.Black, isMoved: false } as Piece;
        result[7][i] = { figType: pieces[i], cord: { x: 7, y: i }, side: Side.White, isMoved: false } as Piece;
        result[7][7 - i] = { figType: pieces[i], cord: { x: 7, y: 7 - i }, side: Side.White, isMoved: false } as Piece;
    }

    result[1] = blackPawns;
    result[6] = whitePawns;
    result[0][4] = { figType: PieceType.King, cord: { x: 0, y: 4 }, side: Side.Black, isMoved: false } as Piece;
    result[7][4] = { figType: PieceType.King, cord: { x: 7, y: 4 }, side: Side.White, isMoved: false } as Piece;

    return result;
};
