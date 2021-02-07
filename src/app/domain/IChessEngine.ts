import { Side, Cord, CordWithMoveType } from './basicChessTypes';
import { IChessBoard } from './IChessBoard';

export interface IChessEngine {
    isCheck(boardState: IChessBoard, side: Side): boolean;
    isCheckmate(boardState: IChessBoard, side: Side): boolean;
    isStealemate(boardState: IChessBoard, side: Side): boolean;

    // getPossibleMovesForPiece będzie uruchamiała funkcje w zalezności od figury
    getPossibleMovesForPiece(cord: Cord, boardState: IChessBoard): CordWithMoveType[];
}
