import { PieceType, Cord, IChessBoard, CordWithMoveType, Side, PossibleCords } from '../domain/basicChessTypes';
import { IChessEngine } from '../domain/IChessEngine';
import { getDirections } from './bishop';

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
            if (piece !== PieceType.Bishop) throw new Error('Piece is not a Bishop');
            const allMoves: PossibleCords[] = getDirections({ x, y });
            const properCords = this.removeMovesOutsideChessBoard(allMoves);
            console.log(properCords);

            this.removeMovesBlockedByPiece(cord, properCords, boardState);

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

    private removeMovesOutsideChessBoard(cords: PossibleCords[]): Cord[] {
        const result = cords.filter((move) => {
            const xCondition = move.x !== undefined && move.x >= 0 && move.x <= 7;
            const yCondition = move.y !== undefined && move.y >= 0 && move.y <= 7;
            return xCondition && yCondition;
        }) as Cord[];

        return result;
    }

    private removeMovesBlockedByPiece(pieceCord: Cord, possibleMovesCords: Cord[], boardState: IChessBoard): Cord[] {
        const cords = possibleMovesCords;

        const otherPiecesCords = cords.filter((cord) => {
            const square = boardState.board[cord.x][cord.y];
            return square ? true : false;
        });
        console.log(otherPiecesCords);

        const positions = otherPiecesCords.map((cord) => {
            return { x: cord.x - pieceCord.x, y: cord.y - pieceCord.y };
        });
        // console.log(positions);

        const result = [];

        for (const otherPieceCord of otherPiecesCords) {
            result.push(
                possibleMovesCords.filter((move) => {
                    let xCondition: boolean;
                    let yCondition: boolean;
                    if (otherPieceCord.x > pieceCord.x) {
                        xCondition = move.x <= otherPieceCord.x;
                    } else {
                        xCondition = move.x >= otherPieceCord.x;
                    }
                    if (otherPieceCord.y > pieceCord.y) {
                        yCondition = move.y <= otherPieceCord.y;
                    } else {
                        yCondition = move.y >= otherPieceCord.y;
                    }
                    return xCondition && yCondition;
                }),
            );
        }
        console.log(result);

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
