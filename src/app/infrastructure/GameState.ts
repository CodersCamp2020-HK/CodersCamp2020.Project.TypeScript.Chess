import { getCapturedPieceNames } from '../utils/CapturedPieces';
import { ChessBoardView, IChessBoard } from '../domain/IChessBoard';
import _ from 'lodash';
import { CordWithMoveType, MoveType, Piece, PieceType, Side } from '../domain/basicChessTypes';

export class GameState {
    private __capturedPieces: { white: string[]; black: string[] }[] = [];
    private __previousBoards: ChessBoardView[] = [];
    private __previousMoves: { white: string[]; black: string[] }[] = [];

    public get capturedPieces(): { white: string[]; black: string[] }[] {
        return this.__capturedPieces;
    }

    public get previousBoards(): ChessBoardView[] {
        return this.__previousBoards;
    }

    public get previousMoves(): { white: string[]; black: string[] }[] {
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

    updatePreviousMoves(piece: Piece, moveTo: CordWithMoveType): void {
        const convertPieceToString = new Map([
            [PieceType.Pawn, 'P'],
            [PieceType.Bishop, 'B'],
            [PieceType.Knight, 'N'],
            [PieceType.Rook, 'R'],
            [PieceType.King, 'K'],
            [PieceType.Queen, 'Q'],
        ]);
        const covnertMoveType = new Map([
            [MoveType.NormalMove, ''],
            [MoveType.Capture, 'x'],
            [MoveType.Promotion, '='],
        ]);
    }
}
