import { IChessBoard, ChessBoardRepresentation, Piece, PieceMove, Cord } from '../domain/basicChessTypes';

export class ChessBoard implements IChessBoard {
    board: ChessBoardRepresentation = [
        [null, null, null, null, null, null, null, null],
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
