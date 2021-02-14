import { CordWithMoveType, MoveType, Piece, PieceType, Side } from '../domain/basicChessTypes';
import { ChessBoardView, IChessBoard } from '../domain/IChessBoard';
import { IChessEngine } from '../domain/IChessEngine';
import { GameController } from '../infrastructure/GameController';

export function possibleCastlingMoves(
    boardState: IChessBoard,
    chessEngine: IChessEngine,
    side: Side,
    previousBoardState: ChessBoardView,
): CordWithMoveType[] {
    const { board } = boardState;
    const kingAr = boardState.getPieces(side, PieceType.King) ?? [];
    const rooks = boardState.getPieces(side, PieceType.Rook) ?? [];
    const castlingCord = [];
    const castlingLeftCords = [1, 2, 3];
    const castlingRightCords = [5, 6];

    if (kingAr === [] || rooks === []) {
        return [];
    }
    const king = kingAr[0];
    if (king.isMoved) {
        return [];
    }

    if (chessEngine.isCheck(boardState, side, previousBoardState)) {
        return [];
    }

    const rookLeft: Piece | undefined = rooks.find((rook) => {
        if (rook.side === Side.Black) {
            return rook.cord.x === 0 && rook.cord.y === 0 ? rook : [];
        } else {
            return rook.cord.x === 7 && rook.cord.y === 0 ? rook : [];
        }
    });

    const rookRight = rooks.find((rook) => {
        if (rook.side === Side.White) {
            return rook.cord.x === 0 && rook.cord.y === 7 ? rook : [];
        } else {
            return rook.cord.x === 7 && rook.cord.y === 7 ? rook : [];
        }
    });

    if (rookLeft) {
        if (rookLeft.isMoved) {
            return [];
        }
        if (castlingLeftCords.every((y) => boardState.board[rookLeft.cord.x][y] === null)) {
            castlingCord.push({ x: rookLeft.cord.x, y: 2, moveType: MoveType.Castling } as CordWithMoveType);
        }
    }
    if (rookRight) {
        if (rookRight.isMoved) {
            return [];
        }
        if (castlingRightCords.every((y) => boardState.board[rookRight.cord.x][y] === null)) {
            castlingCord.push({ x: rookRight.cord.x, y: 6, moveType: MoveType.Castling } as CordWithMoveType);
        }
    }
    return castlingCord;
}

//1. rook i king isMoved === false
//2. pola pomiędzy nimi [1, 0] && [2,0] && [3,0] || [5,0] && [6,0] === null
//3. te pola nie mogą byc szachowane(w zasięgu innych pionków)
//4. Strona która robi roszadę nie może być szachowana isCheck(boardState, side) === false

// const nullLongCastle = [
//     [0, 1],
//     [0, 2],
//     [0, 3],
// ];

// const nullShortCastle = [
//     [0, 5],
//     [0, 6],
// ];

//Z historii ruchów
//Znacznik
//King
//[x+2, y] || [x-2, y]
//Rook
//[x-2, y] || [x+3, y]
