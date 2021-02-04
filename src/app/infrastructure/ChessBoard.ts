import { Piece, Cord, PieceType, Side } from '../domain/basicChessTypes';
import { ChessBoardView, IChessBoard } from '../domain/IChessBoard';
import { generateDeafultChessboard } from '../utils/ChessboardHelpers';
import _ from 'lodash';

type ChessBoardRepresentation = Array<Array<Piece | null>>;

export class ChessBoard implements IChessBoard {
    private __board: ChessBoardRepresentation = generateDeafultChessboard();

    makeMove(piece: Piece, moveTo: Cord): void {
        const { x, y } = moveTo;
        piece.isMoved = true;
        this.__board[piece.cord.x][piece.cord.y] = null;
        piece.cord = { x, y };
        this.__board[x][y] = piece;
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
