import { Side, Cord, CordWithMoveType } from './basicChessTypes';
import { ChessBoardView, IChessBoard } from './IChessBoard';

export interface IChessEngine {
    isCheck(boardState: IChessBoard, side: Side, previousBoardState: ChessBoardView): boolean;
    isCheckmate(boardState: IChessBoard, side: Side, previousBoardState: ChessBoardView): boolean;
    isStealemate(boardState: IChessBoard, side: Side, previousBoardState: ChessBoardView): boolean;

    // getPossibleMovesForPiece będzie uruchamiała funkcje w zalezności od figury
    getPossibleMovesForPiece(
        cord: Cord,
        boardState: IChessBoard,
        previousBoardState?: ChessBoardView,
    ): CordWithMoveType[];
}
