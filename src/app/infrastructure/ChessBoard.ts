import { IChessBoard, Piece, PieceMove, Cord } from '../domain/basicChessTypes';
import { generateDeafultChessboard } from '../utils/ChessboardHelpers';

export class ChessBoard implements IChessBoard {
    board = generateDeafultChessboard();

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
