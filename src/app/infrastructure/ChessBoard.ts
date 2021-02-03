import { IChessBoard, ChessBoardView, Piece, PieceMove, Cord } from '../domain/basicChessTypes';

type ChessBoardRepresentation = Array<Array<Piece | null>>;

export class ChessBoard implements IChessBoard {
    private _board: ChessBoardRepresentation = [[]];

    makeMove(piece: Piece, move: PieceMove): void {
        throw new Error('Method not implemented.');
    }
    hasPiece(cord: Cord): boolean {
        throw new Error('Method not implemented.');
    }

    public static createDefaultBoard(): IChessBoard {
        return new ChessBoard();
    }
    get board(): ChessBoardView {
        return this._board;
    }
}
