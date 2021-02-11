import { getCapturedPieceNames } from '../utils/CapturedPieces';
import { ChessBoardView, IChessBoard } from '../domain/IChessBoard';
import _ from 'lodash';
import { Side } from '../domain/basicChessTypes';

export class GameState {
    private __capturedPieces: { white: string[]; black: string[] }[];
    private __previousBoards: ChessBoardView[];

    constructor() {
        this.__capturedPieces = [];
        this.__previousBoards = [];
    }

    public get capturedPieces(): { white: string[]; black: string[] }[] {
        return this.__capturedPieces;
    }

    public get previousBoards(): ChessBoardView[] {
        return this.__previousBoards;
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
}
