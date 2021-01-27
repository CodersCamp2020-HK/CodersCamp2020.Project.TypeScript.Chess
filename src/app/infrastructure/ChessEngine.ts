import {
    PieceType,
    Cord,
    IChessBoard,
    CordWithMoveType,
    Side,
    PossibleCords,
    MoveType,
} from '../domain/basicChessTypes';
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
        const square = boardState.board[x][y];
        const result: CordWithMoveType[] = [];

        if (square) {
            const piece = square.figType;
            const side = square.side;
            if (piece !== PieceType.Bishop) throw new Error('Piece is not a Bishop');

            const directions = [
                _.zip(_.range(x + 1, 8, 1), _.range(y + 1, 8, 1)),
                _.zip(_.range(x + 1, 8, 1), _.range(y - 1, -1, -1)),
                _.zip(_.range(x - 1, -1, -1), _.range(y + 1, 8, 1)),
                _.zip(_.range(x - 1, -1, -1), _.range(y - 1, -1, -1)),
            ];

            for (const direction of directions) {
                for (const move of direction) {
                    const [x, y] = move;
                    if (x !== undefined && y !== undefined) {
                        const square = boardState.board[x][y];
                        if (square) {
                            if (square.side !== side) {
                                result.push({ x, y, moveType: MoveType.Capture } as CordWithMoveType);
                                break;
                            }
                            break;
                        } else {
                            result.push({ x, y, moveType: MoveType.NormalMove } as CordWithMoveType);
                        }
                    }
                }
            }
            console.log(result);
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
