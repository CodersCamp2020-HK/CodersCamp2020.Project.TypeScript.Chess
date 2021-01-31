import { Piece, PieceType, Side } from '../src/app/domain/basicChessTypes';
import { ChessBoard } from '../src/app/infrastructure/ChessBoard';
import { convertEmojiToRep, convertEmojitoCordWithMoveType } from './Display';

const chessboard = new ChessBoard();
chessboard.board = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

const blackRook: Piece = {
    figType: PieceType.Rook,
    cord: { x: 6, y: 0 },
    side: Side.Black,
    isMoved: true,
};

const king: Piece = {
    figType: PieceType.King,
    cord: { x: 0, y: 1 },
    side: Side.Black,
    isMoved: true,
};

const queen: Piece = {
    figType: PieceType.Queen,
    cord: { x: 7, y: 2 },
    side: Side.Black,
    isMoved: true,
};

const blackPawn: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 4, y: 2 },
    side: Side.Black,
    isMoved: true,
};

const whiteRook: Piece = {
    figType: PieceType.Rook,
    cord: { x: 3, y: 2 },
    side: Side.White,
    isMoved: true,
};

const bishop: Piece = {
    figType: PieceType.Bishop,
    cord: { x: 3, y: 5 },
    side: Side.White,
    isMoved: true,
};

const whitePawn: Piece = {
    figType: PieceType.Pawn,
    cord: { x: 4, y: 4 },
    side: Side.White,
    isMoved: true,
};
const blackKnight: Piece = {
    figType: PieceType.Knight,
    cord: { x: 0, y: 6 },
    side: Side.Black,
    isMoved: true,
};

chessboard.board[blackRook.cord.x][blackRook.cord.y] = blackRook;
chessboard.board[king.cord.x][king.cord.y] = king;
chessboard.board[queen.cord.x][queen.cord.y] = queen;
chessboard.board[blackPawn.cord.x][blackPawn.cord.y] = blackPawn;
chessboard.board[whiteRook.cord.x][whiteRook.cord.y] = whiteRook;
chessboard.board[bishop.cord.x][bishop.cord.y] = bishop;
chessboard.board[whitePawn.cord.x][whitePawn.cord.y] = whitePawn;
chessboard.board[blackKnight.cord.x][blackKnight.cord.y] = blackKnight;

const emojiBoard = [
    ['.', '♚', '.', '.', '.', '.', '♞', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '♖', '.', '.', '♗', '.', '.'],
    ['.', '.', '♟', '.', '♙', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♜', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '♛', '.', '.', '.', '.', '.'],
];

describe(`Given: Emoji chessboard: ${emojiBoard}`, () => {
    describe('When: convertEmojiToRep is invoked on emoji chessboard', () => {
        it(`Then: chessboard representation should be returned`, () => {
            const actual = convertEmojiToRep(emojiBoard);
            expect(actual).toEqual(chessboard.board);
        });
    });
});
