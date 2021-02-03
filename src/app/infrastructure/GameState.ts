import { IChessBoard, Side } from '../domain/basicChessTypes';
import { getCapturedPieceNames } from '../utils/CapturedPieces';

export class GameState {
    private __capturedPieces: { white: string[]; black: string[] }[];

    constructor() {
        this.__capturedPieces = [];
    }

    public get capturedPieces(): { white: string[]; black: string[] }[] {
        return this.__capturedPieces;
    }

    updateCapturedPieces(boardState: IChessBoard): void {
        const blackPieceNames = getCapturedPieceNames(Side.Black, boardState);
        const whitePiecesNames = getCapturedPieceNames(Side.White, boardState);

        const capturedPiece = { white: whitePiecesNames, black: blackPieceNames };
        this.__capturedPieces.push(capturedPiece);
    }
}
