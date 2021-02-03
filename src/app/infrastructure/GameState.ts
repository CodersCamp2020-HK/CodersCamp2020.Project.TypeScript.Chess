import { IChessBoard, Side } from '../domain/basicChessTypes';
import { getCapturedPieceCount } from '../utils/CapturedPieces';

export class GameState {
    capturedPieces: { white: string[]; black: string[] }[];

    constructor() {
        this.capturedPieces = [{ white: [], black: [] }];
    }

    updateCapturedPieces(boardState: IChessBoard): void {
        for (let i = 0; i < 6; i++) {
            const whitePieceCount = getCapturedPieceCount(Side.White, boardState);
            const blackPieceCount = getCapturedPieceCount(Side.Black, boardState);
            const whitePiece = whitePieceCount.get(i);
            const blackPiece = blackPieceCount.get(i);
            if (whitePiece) {
                for (let j = whitePiece.actualCount; j < whitePiece.startingCount; j++) {
                    const lastItemIndex = this.capturedPieces.length - 1 < 0 ? 0 : this.capturedPieces.length - 1;
                    this.capturedPieces[lastItemIndex].white.push(whitePiece.name);
                }
            }
            if (blackPiece) {
                for (let j = blackPiece.actualCount; j < blackPiece.startingCount; j++) {
                    const lastItemIndex = this.capturedPieces.length - 1 < 0 ? 0 : this.capturedPieces.length - 1;
                    this.capturedPieces[lastItemIndex].black.push(blackPiece.name);
                }
            }
        }
    }
}
