import { getCapturedPieceNames } from '../utils/CapturedPieces';
import { ChessBoardView, IChessBoard } from '../domain/IChessBoard';
import _ from 'lodash';
import { CordWithMoveTypes, MoveType, Piece, PieceType, Side, PromotionPieceType } from '../domain/basicChessTypes';
import { IChessEngine } from '../domain/IChessEngine';
import { moveToNotation } from '../utils/MoveToNotation';

export class GameState {
    private __previousMoves: { white: string; black: string }[] = [{ white: '', black: '' }];
    private __capturedPieces: { white: string[]; black: string[] };
    private __previousBoards: ChessBoardView[];

    constructor() {
        this.__capturedPieces = { white: [], black: [] };
        this.__previousBoards = [];
    }

    public get capturedPieces(): { white: string[]; black: string[] } {
        return this.__capturedPieces;
    }

    public get previousBoards(): ChessBoardView[] {
        return this.__previousBoards;
    }

    public get previousMoves(): { white: string; black: string }[] {
        return this.__previousMoves;
    }
    updateCapturedPieces(boardState: IChessBoard, side: Side): void {
        const pieceNames = getCapturedPieceNames(side, boardState);

        side === Side.White ? (this.__capturedPieces.black = pieceNames) : (this.__capturedPieces.white = pieceNames);
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
        const lastBoard =
            this.__previousBoards.length > 0
                ? _.cloneDeep(chessboard.board)
                : this.__previousBoards[this.__previousBoards.length - 1];
        const enemySide = piece.side === Side.White ? Side.Black : Side.White;

        for (const moveType of moveTo.moveType) {
            if (moveType === MoveType.Castling) {
                if (moveTo.y === 6) {
                    this.updateMove('0-0', piece.side, lastIndex);
                } else {
                    this.updateMove('0-0-0', piece.side, lastIndex);
                }
            } else {
                const joinedMove = move.join('');
                this.updateMove(joinedMove, piece.side, lastIndex);
            }
        }
        if (chessEngine.isCheckmate(chessboard, enemySide, chessboard.board)) {
            move.push('#');
            const joinedMove = move.join('');
            piece.side === Side.White
                ? (this.__previousMoves[lastIndex].white = joinedMove)
                : (this.__previousMoves[lastIndex].black = joinedMove);
        }
        if (chessEngine.isStealemate(chessboard, piece.side, chessboard.board)) {
            piece.side === Side.White
                ? (this.__previousMoves[lastIndex].white = '½-½')
                : (this.__previousMoves[lastIndex].black = '½-½');
        }
        if (chessEngine.isCheck(chessboard, piece.side, chessboard.board)) {
            move.push('+');
            const joinedMove = move.join('');
            this.updateMove(joinedMove, piece.side, lastIndex);
        }
    }

    private updateMove(move: string, side: Side, lastIndex: number): void {
        side === Side.White
            ? (this.__previousMoves[lastIndex].white = move)
            : (this.__previousMoves[lastIndex].black = move);
    }
}
