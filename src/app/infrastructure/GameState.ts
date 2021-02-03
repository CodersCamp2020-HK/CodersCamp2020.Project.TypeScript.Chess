import { IChessBoard, Side } from '../domain/basicChessTypes';
import { getCapturedPieceNames } from '../utils/CapturedPieces';

export class GameState {
    capturedPieces: { white: string[]; black: string[] }[];

    constructor() {
        this.capturedPieces = [];
    }

    updateCapturedPieces(boardState: IChessBoard): void {
        const blackPieceNames = getCapturedPieceNames(Side.Black, boardState);
        const whitePiecesNames = getCapturedPieceNames(Side.White, boardState);

        const capturedPiece = { white: whitePiecesNames, black: blackPieceNames };
        this.capturedPieces.push(capturedPiece);
    }
}
