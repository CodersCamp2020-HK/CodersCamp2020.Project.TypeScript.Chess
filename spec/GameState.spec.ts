import { MoveType, Piece } from '../src/app/domain/basicChessTypes';
import { ChessBoard } from '../src/app/infrastructure/ChessBoard';
import { ChessEngine } from '../src/app/infrastructure/ChessEngine';
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
            const expected = [{ black: [], white: [] }];

            const gameState = new GameState();
            jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(firstMoveEmojiBoard));
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
                    black: ['knight', 'knight', 'bishop'],
                    white: ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
                },
            ];

            const gameState = new GameState();
            jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(secondMoveEmojiBoard));
            gameState.updateCapturedPieces(chessboard);
            const actual = gameState.capturedPieces;
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
});

describe(`Given: Starting chessboard: ${displayEmojiBoard(firstMoveEmojiBoard)}`, () => {
    describe('When: updateCapturedPieces is invoked after moves: ♘c3 d5, ♘xd5 a6', () => {
        it(`Then: array with 2 objects should be returned`, () => {
            const expected = [
                {
                    black: [],
                    white: [],
                },
                {
                    black: [],
                    white: ['pawn'],
                },
            ];

            const newChessboard = ChessBoard.createNewBoard();
            const gameState = new GameState();

            const knight = newChessboard.getPiece({ x: 7, y: 1 }) as Piece;
            newChessboard.makeMove(knight, { x: 5, y: 2 });

            const pawn = newChessboard.getPiece({ x: 1, y: 3 }) as Piece;
            newChessboard.makeMove(pawn, { x: 3, y: 3 });
            gameState.updateCapturedPieces(newChessboard);

            newChessboard.makeMove(knight, { x: 3, y: 3 });
            gameState.updateCapturedPieces(newChessboard);

            const actual = gameState.capturedPieces;
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
    describe('When: updatePreviousMoves is invoked after moves: ♘c3 d5, ♘xd5 a6', () => {
        const expected = [
            {
                white: 'Nb1c3',
                black: 'Pd7d5',
            },
            {
                white: 'Nc3d5x',
                black: 'Pa7a6',
            },
        ];
        it(`Then: previous moves should be: ${JSON.stringify(expected, null, 4)}`, () => {
            const newChessboard = ChessBoard.createNewBoard();
            const gameState = new GameState();
            const chessEngine = new ChessEngine();

            const knight = newChessboard.getPiece({ x: 7, y: 1 }) as Piece;
            gameState.updatePreviousMoves(
                knight,
                { x: 5, y: 2, moveType: MoveType.NormalMove },
                chessEngine,
                chessboard,
            );
            newChessboard.makeMove(knight, { x: 5, y: 2 });

            const pawn = newChessboard.getPiece({ x: 1, y: 3 }) as Piece;
            gameState.updatePreviousMoves(pawn, { x: 3, y: 3, moveType: MoveType.NormalMove }, chessEngine, chessboard);
            newChessboard.makeMove(pawn, { x: 3, y: 3 });

            gameState.updatePreviousMoves(knight, { x: 3, y: 3, moveType: MoveType.Capture }, chessEngine, chessboard);
            newChessboard.makeMove(knight, { x: 3, y: 3 });

            const pawn2 = newChessboard.getPiece({ x: 1, y: 0 }) as Piece;
            gameState.updatePreviousMoves(
                pawn2,
                { x: 2, y: 0, moveType: MoveType.NormalMove },
                chessEngine,
                chessboard,
            );
            newChessboard.makeMove(pawn2, { x: 2, y: 0 });

            const actual = gameState.previousMoves;
            expect(actual).toEqual(expect.arrayContaining(expected));
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

const checkEmojiBoard = [
    ['♜', '.', '.', '.', '.', '.', '♖', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '♔', '.', '.', '♖'],
];
const checkMoveEmojiBoard = [
    ['.', '.', '.', '.', '.', '.', '♜', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '♖', '♔', '.'],
];
describe(`Given: Chessboard ${displayEmojiBoard(checkEmojiBoard)}`, () => {
    describe('When: after moves: 0-0 ♜a8g8+', () => {
        const expected = [
            {
                white: '0-0',
                black: 'Ra8g8x+',
            },
        ];
        it(`Then: algebraic notation should be" ${JSON.stringify(expected, null, 4)}`, () => {
            jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(checkEmojiBoard));
            const gameState = new GameState();
            const chessEngine = new ChessEngine();

            const king = chessboard.getPiece({ x: 7, y: 4 }) as Piece;
            gameState.updatePreviousMoves(king, { x: 7, y: 6, moveType: MoveType.Castling }, chessEngine, chessboard);

            const rook = chessboard.getPiece({ x: 0, y: 0 }) as Piece;
            gameState.updatePreviousMoves(rook, { x: 0, y: 6, moveType: MoveType.Capture }, chessEngine, chessboard);
            jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(checkMoveEmojiBoard));

            const actual = gameState.previousMoves;
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
});
