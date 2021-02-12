import { getCapturedPieceNames } from '../utils/CapturedPieces';
import { ChessBoardView, IChessBoard } from '../domain/IChessBoard';
import _ from 'lodash';
import { CordWithMoveTypes, MoveType, Piece, PieceType, Side, PromotionPieceType } from '../domain/basicChessTypes';
import { IChessEngine } from '../domain/IChessEngine';
import { moveToNotation } from '../utils/MoveToNotation';

export class GameState {
    private __capturedPieces: { white: string[]; black: string[] }[] = [];
    private __previousBoards: ChessBoardView[] = [];
    private __previousMoves: { white: string; black: string }[] = [{ white: '', black: '' }];

    public get capturedPieces(): { white: string[]; black: string[] }[] {
        return this.__capturedPieces;
    }

    public get previousBoards(): ChessBoardView[] {
        return this.__previousBoards;
    }

    public get previousMoves(): { white: string; black: string }[] {
        return this.__previousMoves;
    }

    updateCapturedPieces(boardState: IChessBoard): void {
        const blackPieceNames = getCapturedPieceNames(Side.Black, boardState);
        const whitePiecesNames = getCapturedPieceNames(Side.White, boardState);

        const capturedPiece = { black: whitePiecesNames, white: blackPieceNames };
        this.__capturedPieces.push(capturedPiece);
    }

    updatePreviousBoards(chessboard: ChessBoardView): void {
        this.__previousBoards.push(_.cloneDeep(chessboard));
    }

    updatePreviousMoves(
        piece: Piece,
        moveTo: CordWithMoveTypes,
        chessEngine: IChessEngine,
        chessboard: IChessBoard,
        promotionPiece: PromotionPieceType,
    ): void {
        const move = moveToNotation(piece, moveTo, promotionPiece);

        let lastIndex = this.__previousMoves.length - 1;
        if (this.__previousMoves[lastIndex].white.length > 0 && this.__previousMoves[lastIndex].black.length > 0) {
            this.__previousMoves.push({ white: '', black: '' });
            lastIndex++;
        }

        for (const moveType of moveTo.moveType) {
            // if (chessEngine.isCheckmate(chessboard, enemySide)) {
            //     move.push('#');
            //     const joinedMove = move.join();
            //     piece.side === Side.White
            //         ? (this.__previousMoves[lastIndex].white = joinedMove)
            //         : (this.__previousMoves[lastIndex].black = joinedMove);
            //     return;
            // }
            // if (chessEngine.isStealemate(chessboard, enemySide)) {
            //     piece.side === Side.White
            //         ? (this.__previousMoves[lastIndex].white = '½-½')
            //         : (this.__previousMoves[lastIndex].black = '½-½');
            //     return;
            // }
            if (chessEngine.isCheck(chessboard, piece.side)) {
                move.push('+');
                const joinedMove = move.join('');
                this.updateMove(joinedMove, piece.side, lastIndex);
            }
            if (moveType === MoveType.Castling) {
                if (moveTo.y === 6) {
                    this.updateMove('0-0', piece.side, lastIndex);
                } else {
                    this.updateMove('0-0-0', piece.side, lastIndex);
                }
                return;
            } else {
                const joinedMove = move.join('');
                this.updateMove(joinedMove, piece.side, lastIndex);
            }
        }
    }

    private updateMove(move: string, side: Side, lastIndex: number): void {
        side === Side.White
            ? (this.__previousMoves[lastIndex].white = move)
            : (this.__previousMoves[lastIndex].black = move);
    }
}
