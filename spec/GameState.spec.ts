import { Piece } from '../src/app/domain/basicChessTypes';
import { ChessBoard } from '../src/app/infrastructure/ChessBoard';
import { GameState } from '../src/app/infrastructure/GameState';
import { convertEmojiToRep, displayEmojiBoard } from './Display';

const chessboard = new ChessBoard();

const firstMoveEmojiBoard = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
];

describe(`Given: Starting chessboard: ${displayEmojiBoard(firstMoveEmojiBoard)}`, () => {
    describe('When: updateCapturedPieces on gameState object is invoked', () => {
        it(`Then: empty array for white and black pieces should be returned`, () => {
            const expected = [{ white: [], black: [] }];

            const gameState = new GameState();
            chessboard.board = convertEmojiToRep(firstMoveEmojiBoard);
            gameState.updateCapturedPieces(chessboard);
            const actual = gameState.capturedPieces;
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
});

const secondMoveEmojiBoard = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '.', '.', '♕', '♔', '♗', '.', '♖'],
];

describe(`Given: Starting chessboard: ${displayEmojiBoard(secondMoveEmojiBoard)}`, () => {
    describe('When: updateCapturedPieces on gameState object is invoked', () => {
        it(`Then: empty array for white and black pieces should be returned`, () => {
            const expected = [
                {
                    white: ['knight', 'knight', 'bishop'],
                    black: ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
                },
            ];

            const gameState = new GameState();
            chessboard.board = convertEmojiToRep(secondMoveEmojiBoard);
            gameState.updateCapturedPieces(chessboard);
            const actual = gameState.capturedPieces;
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
});

describe(`Given: Starting chessboard: ${displayEmojiBoard(firstMoveEmojiBoard)}`, () => {
    describe('When: after moves: ♘c3 d5, ♘xd5 a6', () => {
        it(`Then: array with 2 objects should be returned`, () => {
            const expected = [
                {
                    white: [],
                    black: [],
                },
                {
                    white: [],
                    black: ['pawn'],
                },
            ];

            const gameState = new GameState();
            chessboard.board = convertEmojiToRep(firstMoveEmojiBoard);

            const knight = chessboard.board[7][1] as Piece;
            chessboard.board[7][1] = null;
            chessboard.board[5][2] = knight;
            knight.cord = { x: 5, y: 2 };

            const pawn = chessboard.board[1][3] as Piece;
            chessboard.board[1][3] = null;
            chessboard.board[3][3] = pawn;
            pawn.cord = { x: 3, y: 3 };
            gameState.updateCapturedPieces(chessboard);

            chessboard.board[5][2] = null;
            chessboard.board[3][3] = knight;
            knight.cord = { x: 3, y: 3 };
            gameState.updateCapturedPieces(chessboard);
            const actual = gameState.capturedPieces;
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
});
