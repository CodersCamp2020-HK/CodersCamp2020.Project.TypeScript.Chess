import { PieceType, Cord, CordWithMoveType, Side } from '../domain/basicChessTypes';
import { IChessBoard } from '../domain/IChessBoard';
import { IChessEngine } from '../domain/IChessEngine';

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
