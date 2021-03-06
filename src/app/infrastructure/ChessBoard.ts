import { Piece, Cord, PieceType, Side } from '../domain/basicChessTypes';
import { ChessBoardView, IChessBoard } from '../domain/IChessBoard';
import { generateDeafultChessboard } from '../utils/ChessboardHelpers';
import _ from 'lodash';

export type ChessBoardRepresentation = Array<Array<Piece | null>>;

export class ChessBoard implements IChessBoard {
    private __board: ChessBoardRepresentation;

    constructor(board?: ChessBoardRepresentation) {
        this.__board = board ? board : generateDeafultChessboard();
    }

    makeMove(piece: Piece, moveTo: Cord): void {
        const { x, y } = moveTo;
        piece.isMoved = true;
        this.__board[piece.cord.x][piece.cord.y] = null;
        piece.cord = { x, y };
        this.__board[x][y] = piece;
    }

    makeEnPassant(piece: Piece, moveTo: Cord): void {
        piece.isMoved = true;
        const { x: newX, y: newY } = moveTo;
        const { x: oldX } = piece.cord;
        this.makeMove(piece, { x: oldX, y: newY });
        this.makeMove(piece, { x: newX, y: newY });
    }

    makeCastling(piece: Piece, moveTo: Cord): void {
        piece.isMoved = true;
        if (moveTo.y - piece.cord.y > 0) {
            const rook = piece.side === Side.White ? this.getPiece({ x: 7, y: 7 }) : this.getPiece({ x: 0, y: 7 });
            if (rook) {
                this.makeMove(rook, { x: rook.cord.x, y: moveTo.y - 1 } as Cord);
            }
        } else {
            const rook = piece.side === Side.White ? this.getPiece({ x: 7, y: 0 }) : this.getPiece({ x: 0, y: 0 });
            if (rook) {
                this.makeMove(rook, { x: rook.cord.x, y: moveTo.y + 1 } as Cord);
            }
        }
        this.makeMove(piece, moveTo);
    }

    static createNewBoard(board?: ChessBoardView): IChessBoard {
        return new ChessBoard(board as ChessBoardRepresentation);
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
