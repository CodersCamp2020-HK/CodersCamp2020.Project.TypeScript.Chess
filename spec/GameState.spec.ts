import { Piece, Side } from '../src/app/domain/basicChessTypes';
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
            const expected = { black: [], white: [] };
            const gameState = new GameState();
            jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(firstMoveEmojiBoard));
            gameState.updateCapturedPieces(chessboard, Side.Black);
            gameState.updateCapturedPieces(chessboard, Side.White);
            const actual = gameState.capturedPieces;
            expect(actual).toEqual(expect.objectContaining(expected));
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
            const expected = {
                black: ['knight', 'knight', 'bishop'],
                white: ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
            };

            const gameState = new GameState();
            jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(secondMoveEmojiBoard));
            gameState.updateCapturedPieces(chessboard, Side.Black);
            gameState.updateCapturedPieces(chessboard, Side.White);
            const actual = gameState.capturedPieces;
            expect(actual).toEqual(expect.objectContaining(expected));
        });
    });
});

describe(`Given: Starting chessboard: ${displayEmojiBoard(firstMoveEmojiBoard)}`, () => {
    describe('When: after moves: ♘c3 d5, ♘xd5 a6', () => {
        it(`Then: array with 2 objects should be returned`, () => {
            const expected = {
                black: [],
                white: ['pawn'],
            };

            const newChessboard = ChessBoard.createNewBoard();
            const gameState = new GameState();

            const knight = newChessboard.getPiece({ x: 7, y: 1 }) as Piece;
            newChessboard.makeMove(knight, { x: 5, y: 2 });
            gameState.updateCapturedPieces(newChessboard, knight.side);

            const pawn = newChessboard.getPiece({ x: 1, y: 3 }) as Piece;
            newChessboard.makeMove(pawn, { x: 3, y: 3 });
            gameState.updateCapturedPieces(newChessboard, knight.side);

            newChessboard.makeMove(knight, { x: 3, y: 3 });
            gameState.updateCapturedPieces(newChessboard, pawn.side);

            const actual = gameState.capturedPieces;
            expect(actual).toEqual(expect.objectContaining(expected));
        });
    });
});

const firstEmoji = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '.', '.', '♕', '♔', '♗', '.', '♖'],
];
const secondEmoji = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '♙', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♙', '.', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '.', '.', '♕', '♔', '♗', '.', '♖'],
];
const thirdEmoji = [
    ['♜', '.', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♞', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '.', '.', '♕', '♔', '♗', '.', '♖'],
];

describe(`Given: Starting chessboard ${displayEmojiBoard(firstMoveEmojiBoard)}`, () => {
    describe('When: updatePreviousBoards is invoked on starting chessboard', () => {
        const expected = convertEmojiToRep(firstMoveEmojiBoard);
        const gameState = new GameState();
        jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(firstMoveEmojiBoard));
        gameState.updatePreviousBoards(chessboard.board);
        it(`Then: previousBoards at index 0 should be: `, () => {
            const actual = gameState.previousBoards[0];
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it('Then: previousBoards should contain only 1 element', () => {
            const actual = gameState.previousBoards.length;
            expect(actual).toBe(1);
        });
    });
    describe('When: updatePreviousBoards is invoked 3 times on 3 different boards', () => {
        const gameState = new GameState();
        const expected = convertEmojiToRep(thirdEmoji);
        jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(firstEmoji));
        gameState.updatePreviousBoards(chessboard.board);
        jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(secondEmoji));
        gameState.updatePreviousBoards(chessboard.board);
        jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(thirdEmoji));
        gameState.updatePreviousBoards(chessboard.board);
        it('Then: previousBoards at index 2 should be: ', () => {
            const actual = gameState.previousBoards[2];
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
        it('Then: previousBoards should contain 3 elements', () => {
            const actual = gameState.previousBoards.length;
            expect(actual).toBe(3);
        });
    });
});
