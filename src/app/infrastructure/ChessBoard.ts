import { Piece, PieceMove, Cord } from '../domain/basicChessTypes';
import { ChessBoardView, IChessBoard } from '../domain/IChessBoard';
import { generateDeafultChessboard } from '../utils/ChessboardHelpers';

type ChessBoardRepresentation = Array<Array<Piece | null>>;

export class ChessBoard implements IChessBoard {
    private __board: ChessBoardRepresentation = generateDeafultChessboard();

    makeMove(piece: Piece, move: PieceMove): void {
        const { x: oldX, y: oldY } = move.from;
        const { x: newX, y: newY } = move.to;
        piece.cord = { x: newX, y: newY };
        this.__board[oldX][oldY] = null;
        this.__board[newX][newY] = piece;
    }
    hasPiece(cord: Cord): boolean {
        return this.__board[cord.x][cord.y] !== null;
    }

    static createNewBoard(): IChessBoard {
        return new ChessBoard();
    }

    get board(): ChessBoardView {
        return this.__board;
    }

    // getPiece(side: Side, pieceType: PieceType): Piece | null {
    //     return null;
    // }

    // getPiece(cord: Cord): Piece | null {
    //     return null;
    // }
}
