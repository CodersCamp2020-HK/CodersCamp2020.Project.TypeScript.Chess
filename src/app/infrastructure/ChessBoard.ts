import {
    IChessBoard,
    ChessBoardRepresentation,
    Piece,
    PieceMove,
    Cord,
    PieceType,
    Side,
} from '../domain/basicChessTypes';

export class ChessBoard implements IChessBoard {
    board: ChessBoardRepresentation = [
        [
            { cord: { x: 0, y: 0 }, figType: PieceType.Bishop, side: Side.Black } as Piece,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ];
    makeMove(piece: Piece, move: PieceMove): void {
        throw new Error('Method not implemented.');
    }
    hasPiece(cord: Cord): boolean {
        throw new Error('Method not implemented.');
    }

    public static createDefaultBoard(): IChessBoard {
        return new ChessBoard();
    }
}
