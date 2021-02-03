import { IChessBoard, Side } from '../domain/basicChessTypes';
import { getCapturedPieceNames } from '../utils/CapturedPieces';

export class GameState {
    capturedPieces: { white: string[]; black: string[] }[];

    constructor() {
        this.capturedPieces = [{ white: [], black: [] }];
    }

    updateCapturedPieces(boardState: IChessBoard): void {
        const blackPieceNames = getCapturedPieceNames(Side.Black, boardState);
        const whitePiecesNames = getCapturedPieceNames(Side.White, boardState);

        const lastItemIndex = this.capturedPieces.length - 1 < 0 ? 0 : this.capturedPieces.length - 1;
        this.capturedPieces[lastItemIndex].black.push(...blackPieceNames);
        this.capturedPieces[lastItemIndex].white.push(...whitePiecesNames);
    }
}
