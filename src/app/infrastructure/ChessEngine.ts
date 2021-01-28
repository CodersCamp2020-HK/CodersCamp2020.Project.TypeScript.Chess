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
import { getDirections } from './bishop';
import { getRookDirections } from './rook';
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
        const square = boardState.board[cord.x][cord.y];
        if (square) {
            const directions = getRookDirections(cord);
            const moves = this.removeMovesBlockedByPiece(cord, directions, boardState);
            const result = this.getMoveTypesForPiece(moves, square.side, boardState);
            // console.log(result);

            return [];
        }
        return [];
    }

    getPossibleMovesForKnight(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        return [];
    }

    getPossibleMovesForBishop(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        const { x, y } = cord;
        const square = boardState.board[x][y];
        if (square) {
            const allMoves = getDirections({ x, y });
            const properCords = this.removeMovesOutsideChessBoard(allMoves);
            const moves = this.removeMovesBlockedByPiece(cord, properCords, boardState);
            const result = this.getMoveTypesForPiece(moves, square.side, boardState);

            console.log(result);

            return result;
        }

        return [];
    }

    getPossibleMovesForQueen(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        return this.getPossibleMovesForBishop(cord, boardState).concat(this.getPossibleMovesForRook(cord, boardState));
    }

    getPossibleMovesForKing(cord: Cord, boardState: IChessBoard): CordWithMoveType[] {
        const square = boardState.board[cord.x][cord.y];
        if (square) {
            const numbers = [-1, 1];
            const possibleMoves = [];

            for (const i of numbers) {
                const actualKingPositionX = cord.x + i;
                const actualKingPositionY = cord.y;
                possibleMoves.push({ x: actualKingPositionX, y: actualKingPositionY });
            }

            for (const i of numbers) {
                const actualKingPositionX = cord.x;
                const actualKingPositionY = cord.y + i;
                possibleMoves.push({ x: actualKingPositionX, y: actualKingPositionY });
            }

            for (const i of numbers) {
                for (const j of numbers) {
                    const actualKingPositionX = cord.x + i;
                    const actualKingPositionY = cord.y + j;
                    possibleMoves.push({ x: actualKingPositionX, y: actualKingPositionY });
                }
            }

            const properMoves = this.removeMovesOutsideChessBoard(possibleMoves);
            const moves = this.removeMovesBlockedByPiece(cord, properMoves, boardState);
            const result = this.getMoveTypesForPiece(moves, square.side, boardState);

            // console.log(result);

            return result;
        }
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
        const otherPiecesCords = this.getOtherPiecesCord(possibleMovesCords, boardState);
        const result: Cord[] = this.excludeMovesBehindPiece(pieceCord, possibleMovesCords, otherPiecesCords);

        return result;
    }

    private getOtherPiecesCord(possibleMovesCords: Cord[], boardState: IChessBoard) {
        return possibleMovesCords.filter((cord) => {
            const square = boardState.board[cord.x][cord.y];
            return square ? true : false;
        });
    }

    private excludeMovesBehindPiece(pieceCord: Cord, possibleMovesCords: Cord[], otherPiecesCords: Cord[]): Cord[] {
        const diffArr: Cord[] = [];

        for (const otherPieceCord of otherPiecesCords) {
            const vector = { x: otherPieceCord.x - pieceCord.x, y: otherPieceCord.y - pieceCord.y };
            let versorX;
            let versorY;
            vector.x === 0 ? (versorX = 0) : vector.x > 0 ? (versorX = 1) : (versorX = -1);
            vector.y === 0 ? (versorY = 0) : vector.y > 0 ? (versorY = 1) : (versorY = -1);
            for (let i = 1; i <= 7; i++) {
                const oneDiffCord = { x: otherPieceCord.x + versorX * i, y: otherPieceCord.y + versorY * i } as Cord;
                if (oneDiffCord.x > 7 || oneDiffCord.x < 0 || oneDiffCord.y > 7 || oneDiffCord.y < 0) break;
                diffArr.push(oneDiffCord);
            }
            console.log(diffArr);
        }

        return _.differenceWith(possibleMovesCords, diffArr, _.isEqual);
    }

    private getMoveTypesForPiece(cords: Cord[], side: Side, boardState: IChessBoard): CordWithMoveType[] {
        const result: CordWithMoveType[] = [];
        for (const move of cords) {
            const { x, y } = move;
            const square = boardState.board[x][y];
            if (square) {
                const otherSide = square.side;
                if (otherSide !== side) {
                    result.push({ x, y, moveType: MoveType.Capture });
                }
            } else {
                result.push({ x, y, moveType: MoveType.NormalMove });
            }
        }

        return result;
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
