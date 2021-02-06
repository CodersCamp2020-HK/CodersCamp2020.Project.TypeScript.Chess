import { ChessBoardRepresentation, IChessBoard, Side } from '../domain/basicChessTypes';
import { getCapturedPieceNames } from '../utils/CapturedPieces';
import _ from 'lodash';

export class GameState {
    private __capturedPieces: { white: string[]; black: string[] }[];
    private __previousBoards: ChessBoardRepresentation[];

    constructor() {
        this.__capturedPieces = [];
        this.__previousBoards = [];
    }

    public get capturedPieces(): { white: string[]; black: string[] }[] {
        return this.__capturedPieces;
    }

    public get previousBoards(): ChessBoardRepresentation[] {
        return this.__previousBoards;
    }

    updateCapturedPieces(boardState: IChessBoard): void {
        const blackPieceNames = getCapturedPieceNames(Side.Black, boardState);
        const whitePiecesNames = getCapturedPieceNames(Side.White, boardState);

        const capturedPiece = { black: whitePiecesNames, white: blackPieceNames };
        this.__capturedPieces.push(capturedPiece);
    }

    updatePreviousBoards(chessboard: ChessBoardRepresentation): void {
        const copiedArray = _.cloneDeep(chessboard);
        this.__previousBoards.push(copiedArray);
    }
}
