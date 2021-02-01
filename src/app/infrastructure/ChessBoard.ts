import { IChessBoard, Piece, PieceMove, Cord } from '../domain/basicChessTypes';
import { generateDeafultChessboard } from '../utils/ChessboardHelpers';

export class ChessBoard implements IChessBoard {
    board = generateDeafultChessboard();

    makeMove(piece: Piece, move: PieceMove): void {
        const { x: oldX, y: oldY } = move.from;
        const { x: newX, y: newY } = move.to;
        piece.cord = { x: newX, y: newY };
        this.board[oldX][oldY] = null;
        this.board[newX][newY] = piece;
    }
    hasPiece(cord: Cord): boolean {
        return this.board[cord.x][cord.y] !== null;
    }

    public static createNewBoard(): IChessBoard {
        return new ChessBoard();
    }
}
