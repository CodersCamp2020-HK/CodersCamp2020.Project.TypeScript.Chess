import { IChessBoard, Side, Cord, CordWithMoveType } from './basicChessTypes';

export interface IChessEngine {
    isCheck(boardState: IChessBoard, side: Side): boolean;
    isCheckmate(boardState: IChessBoard, side: Side): boolean;
    isStealemate(boardState: IChessBoard, side: Side): boolean;
    checkCastle(kingsCord: Cord, rooksCord: Cord, boardState: IChessBoard): boolean;
    makeCastle(kingsCord: Cord, rooksCord: Cord, boardState: IChessBoard): CordWithMoveType;

    // getPossibleMovesForPiece będzie uruchamiała funkcje w zalezności od figury
    getPossibleMovesForPiece(cord: Cord, boardState: IChessBoard): CordWithMoveType[];
}
