import { Piece, PieceMove, Cord, PieceType, Side } from '../domain/basicChessTypes';
import { ChessBoardView, IChessBoard } from '../domain/IChessBoard';
import { generateDeafultChessboard } from '../utils/ChessboardHelpers';
import _ from 'lodash';

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

    static createNewBoard(): IChessBoard {
        return new ChessBoard();
    }

    get board(): ChessBoardView {
        return this.__board;
    }

    getPieces(side: Side, pieceType: PieceType): Piece[] | null {
        const result = _.flattenDeep(this.__board).filter(
            (square): square is Piece => square !== null && square.side === side && square.figType === pieceType,
        );
        return result ? result : null;
    }

    getPiece(cord: Cord): Piece | null {
        return this.__board[cord.x][cord.y];
    }
}
