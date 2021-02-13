import { getCapturedPieceNames } from '../utils/CapturedPieces';
import { ChessBoardView, IChessBoard } from '../domain/IChessBoard';
import _ from 'lodash';
import { Side, StringPieces } from '../domain/basicChessTypes';

export class GameState {
    private __capturedPieces: { white: StringPieces[]; black: StringPieces[] };
    private __previousBoards: ChessBoardView[];

    constructor() {
        this.__capturedPieces = { white: [], black: [] };
        this.__previousBoards = [];
    }

    public get capturedPieces(): { white: StringPieces[]; black: StringPieces[] } {
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
