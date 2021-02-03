import { Piece, PieceType, Cord, IChessBoard, CordWithMoveType, Side } from '../domain/basicChessTypes';
import { IChessEngine } from '../domain/IChessEngine';
import {
    getPossibleMovesForBishop,
    getPossibleMovesForKing,
    getPossibleMovesForKnight,
    getPossibleMovesForPawn,
    getPossibleMovesForQueen,
    getPossibleMovesForRook,
} from '../utils/Moves';
import _ from 'lodash';

export class ChessEngine implements IChessEngine {
    getMovesByPiece: Map<PieceType, (cord: Cord, boardState: IChessBoard) => CordWithMoveType[]>;

    constructor() {
        this.getMovesByPiece = new Map([
            [PieceType.Bishop, getPossibleMovesForBishop],
            [PieceType.King, getPossibleMovesForKing],
            [PieceType.Knight, getPossibleMovesForKnight],
            [PieceType.Pawn, getPossibleMovesForPawn],
            [PieceType.Queen, getPossibleMovesForQueen],
            [PieceType.Rook, getPossibleMovesForRook],
        ]);
    }

    getPossibleMovesForPiece(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        const piece = boardState.board[cord.x][cord.y];
        if (!piece) {
            return [];
        }
        const handler = this.getMovesByPiece.get(piece.figType);
        if (!handler) {
            return [];
        }
        return handler(cord, boardState);
    }

    isCheck(boardState: IChessBoard, side: Side): boolean {
        function hasSide(side: Side) {
            return (item: Piece): item is Piece => item.side !== side;
        }

        function isFigure(figure: PieceType) {
            return (item: Piece): item is Piece => item.figType === figure;
        }

        function notNull<T, R extends T>(...next: ((item: T) => item is R)[]) {
            return (item: T | null): item is R => {
                if (item !== null) {
                    return next.reduce((p, c) => (item: T): item is R => p(item) && c(item))(item);
                }
                return false;
            };
        }

        const f = notNull(hasSide(Side.Black), isFigure(PieceType.King));

        const { board } = boardState;
        boardState.board = [[]];
        const allEnemyPieces = boardState.getPieces(); //_.flattenDeep(board).filter(notNull(hasSide(side)));
        const allEnemyPiecesMoves = allEnemyPieces.map((piece) => {
            return this.getPossibleMovesForPiece({ x: piece.cord.x, y: piece.cord.y }, boardState);
        });
        /*
        const king = _.flattenDeep(board).find(
            (item): item is Piece => item !== null && item.side === side && item.figType === PieceType.King,
        );
        */

        const king = boardState.getPiece(Side.Black, PieceType.King);
        getPiece() {
            return { piece: pice, cord: {x: i, y: j}};
        }
        king.cord.x = 10;
        const king = boardState.getPieceByCord({ x: 10, y: 20});

        // const king = _.flattenDeep(board).find(notNull(hasSide(side), isFigure(PieceType.King)));
        if (!king) throw new Error('Król zbiegł z pola bitwy');
        const result = _.flattenDeep(allEnemyPiecesMoves).some(
            (item) => item.x === king.cord.x && item.y === king.cord.y,
        );
        return result;
    }
    isCheckmate(boardState: IChessBoard, side: Side): boolean {
        throw new Error('Method not implemented.');
    }
    isStealemate(boardState: IChessBoard, side: Side): boolean {
        throw new Error('Method not implemented.');
    }
}
