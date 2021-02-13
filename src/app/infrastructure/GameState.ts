import { getCapturedPieceNames } from '../utils/CapturedPieces';
import { ChessBoardView, IChessBoard } from '../domain/IChessBoard';
import _ from 'lodash';
import { Side } from '../domain/basicChessTypes';

export class GameState {
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

    updateCapturedPieces(boardState: IChessBoard, side: Side): void {
        const pieceNames = getCapturedPieceNames(side, boardState);

        side === Side.White ? (this.__capturedPieces.black = pieceNames) : (this.__capturedPieces.white = pieceNames);
    }

    updatePreviousBoards(chessboard: ChessBoardView): void {
        this.__previousBoards.push(_.cloneDeep(chessboard));
    }
}
