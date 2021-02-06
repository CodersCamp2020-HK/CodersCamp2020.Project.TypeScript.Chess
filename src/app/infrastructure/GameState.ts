import { ChessBoardRepresentation, IChessBoard, Side } from '../domain/basicChessTypes';
import { getCapturedPieceNames } from '../utils/CapturedPieces';

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

    getPreviousBoards(moveNumber: number): ChessBoardRepresentation {
        if (moveNumber < 0 || moveNumber > this.__previousBoards.length - 1)
            throw new Error(`There is no move with number: ${moveNumber} `);
        return this.__previousBoards[moveNumber];
    }

    updateCapturedPieces(boardState: IChessBoard): void {
        const blackPieceNames = getCapturedPieceNames(Side.Black, boardState);
        const whitePiecesNames = getCapturedPieceNames(Side.White, boardState);

        const capturedPiece = { black: whitePiecesNames, white: blackPieceNames };
        this.__capturedPieces.push(capturedPiece);
    }

    updatePreviousBoards(chessboard: IChessBoard): void {
        this.__previousBoards.push(chessboard.board);
    }
}
