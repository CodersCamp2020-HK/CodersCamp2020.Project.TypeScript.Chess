import { PieceType, Cord, IChessBoard, CordWithMoveType, Side, MoveType } from '../domain/basicChessTypes';
import { IChessEngine } from '../domain/IChessEngine';
import _ from 'lodash';

export class ChessEngine implements IChessEngine {
    getMovesByPiece: Map<PieceType, (cord: Cord, boardState: IChessBoard) => CordWithMoveType[]>;

    constructor() {
        this.getMovesByPiece = new Map([
            [PieceType.Bishop, this.getPossibleMovesForBishop],
            [PieceType.King, this.getPossibleMovesForKnight],
            [PieceType.Knight, this.getPossibleMovesForKnight],
            [PieceType.Pawn, this.getPossibleMovesForPawn],
            [PieceType.Queen, this.getPossibleMovesForQueen],
            [PieceType.Rook, this.getPossibleMovesForRook],
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

    getPossibleMovesForPawn(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        return [];
    }
    getPossibleMovesForRook(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        return [];
    }
    getPossibleMovesForKnight(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        return [];
    }
    getPossibleMovesForBishop(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        const { x, y } = cord;
        const board = boardState.board[x][y];
        const result: CordWithMoveType[] = [];
        if (board) {
            const piece = board.figType;
            if (piece !== PieceType.Bishop) throw new Error('Piece is not a Bishop');

            const directions = [
                ..._.zip(_.range(x + 1, 8, 1), _.range(y + 1, 8, 1)),
                ..._.zip(_.range(x + 1, 8, 1), _.range(y - 1, -1, -1)),
                ..._.zip(_.range(x - 1, -1, -1), _.range(y + 1, 8, 1)),
                ..._.zip(_.range(x - 1, -1, -1), _.range(y - 1, -1, -1)),
            ];
            console.log(directions);
            for (const move of directions) {
                if (move[0] !== undefined && move[1] !== undefined) {
                    const propperCord = { x: move[0], y: move[1] } as Cord;
                    const propperCordMove = {
                        ...propperCord,
                        moveType: MoveType.NormalMove,
                    } as CordWithMoveType;
                    result.push(propperCordMove);
                }
            }
            return result;
        }

        return [];
    }

    getPossibleMovesForQueen(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        return this.getPossibleMovesForBishop(cord, boardState).concat(this.getPossibleMovesForRook(cord, boardState));
    }
    getPossibleMovesForKing(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        return [];
    }
    removeMovesOutsideChessBoard(cords: CordWithMoveType[]): CordWithMoveType[] {
        return [];
    }
    removeMovesBlockedByPiece(cords: CordWithMoveType[]): CordWithMoveType[] {
        return [];
    }

    isCheck(boardState: IChessBoard, side: Side): boolean {
        throw new Error('Method not implemented.');
    }
    isCheckmate(boardState: IChessBoard, side: Side): boolean {
        throw new Error('Method not implemented.');
    }
    isStealemate(boardState: IChessBoard, side: Side): boolean {
        throw new Error('Method not implemented.');
    }
}
