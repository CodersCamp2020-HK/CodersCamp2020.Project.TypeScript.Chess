import _ from 'lodash';
import { MoveType, Piece, PromotionPieceType, Side } from '../src/app/domain/basicChessTypes';
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
    describe('When: updateCapturedPieces is invoked after moves: ♘c3 d5, ♘xd5 a6', () => {
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
                { x: 5, y: 2, moveType: [MoveType.NormalMove] },
                chessEngine,
                chessboard,
                PromotionPieceType.Queen,
            );
            newChessboard.makeMove(knight, { x: 5, y: 2 });

            const pawn = newChessboard.getPiece({ x: 1, y: 3 }) as Piece;
            gameState.updatePreviousMoves(
                pawn,
                { x: 3, y: 3, moveType: [MoveType.NormalMove] },
                chessEngine,
                chessboard,
                PromotionPieceType.Queen,
            );
            newChessboard.makeMove(pawn, { x: 3, y: 3 });

            gameState.updatePreviousMoves(
                knight,
                { x: 3, y: 3, moveType: [MoveType.Capture] },
                chessEngine,
                chessboard,
                PromotionPieceType.Queen,
            );
            newChessboard.makeMove(knight, { x: 3, y: 3 });

            const pawn2 = newChessboard.getPiece({ x: 1, y: 0 }) as Piece;
            gameState.updatePreviousMoves(
                pawn2,
                { x: 2, y: 0, moveType: [MoveType.NormalMove] },
                chessEngine,
                chessboard,
                PromotionPieceType.Queen,
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
        gameState.updatePreviousBoards(chessboard.board, Side.Black);
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
        gameState.updatePreviousBoards(chessboard.board, Side.Black);
        jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(secondEmoji));
        gameState.updatePreviousBoards(chessboard.board, Side.Black);
        jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(thirdEmoji));
        gameState.updatePreviousBoards(chessboard.board, Side.Black);
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
    ['♚', '♜', '.', '.', '.', '.', '♖', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '♔', '.', '.', '♖'],
];
const checkMoveEmojiBoard = [
    ['♚', '.', '.', '.', '.', '.', '♜', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '♖', '♔', '.'],
];

const beforeQueenSideCastlingEmojiBoard = [
    ['.', '.', '♚', '.', '.', '♞', '.', '♞'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♖', '.', '.', '.', '♔', '.', '.', '.'],
];
const afterQueenSideCastlingEmojiBoard = [
    ['.', '.', '♚', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '♔', '♖', '.', '.', '.', '.'],
];
describe(`Given: Chessboard ${displayEmojiBoard(beforeQueenSideCastlingEmojiBoard)}
${displayEmojiBoard(afterQueenSideCastlingEmojiBoard)}`, () => {
    describe('When: after moves: 0-0 ♜a8g8+', () => {
        const expected = [
            {
                white: '0-0-0',
                black: '',
            },
        ];
        it(`Then: algebraic notation should be" ${JSON.stringify(expected, null, 4)}`, () => {
            jest.spyOn(chessboard, 'board', 'get').mockReturnValue(
                convertEmojiToRep(beforeQueenSideCastlingEmojiBoard),
            );
            const gameState = new GameState();
            const chessEngine = new ChessEngine();

            const king = chessboard.getPiece({ x: 7, y: 4 }) as Piece;
            gameState.updatePreviousMoves(
                king,
                { x: 7, y: 2, moveType: [MoveType.Castling] },
                chessEngine,
                chessboard,
                PromotionPieceType.Queen,
            );

            jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(afterQueenSideCastlingEmojiBoard));

            const actual = gameState.previousMoves;
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
});

const defaultChessboard = ChessBoard.createNewBoard();
describe(`Given: Starting chessboard: ${displayEmojiBoard(firstMoveEmojiBoard)}`, () => {
    describe(`When: scholar's mate is made`, () => {
        const expected = [
            {
                white: 'Pe2e4',
                black: 'Pe7e5',
            },
            {
                white: 'Bf1c4',
                black: 'Nb8c6',
            },
            {
                white: 'Qd1h5',
                black: 'Ng8f6',
            },
            {
                white: 'Qh5f7x#',
                black: '',
            },
        ];
        it(`Then: updatePreviousMoves should return:\n${JSON.stringify(expected, null, 4)}`, () => {
            const gameState = new GameState();
            const chessEngine = new ChessEngine();

            const whitePawn = defaultChessboard.getPiece({ x: 6, y: 4 }) as Piece;
            const whitePawnCopy = _.cloneDeep(whitePawn);
            defaultChessboard.makeMove(whitePawn, { x: 4, y: 4 });
            gameState.updatePreviousMoves(
                whitePawnCopy,
                { ...whitePawn.cord, moveType: [MoveType.NormalMove] },
                chessEngine,
                defaultChessboard,
                PromotionPieceType.Queen,
            );

            const blackPawn = defaultChessboard.getPiece({ x: 1, y: 4 }) as Piece;
            const blackPawnCopy = _.cloneDeep(blackPawn);
            defaultChessboard.makeMove(blackPawn, { x: 3, y: 4 });
            gameState.updatePreviousMoves(
                blackPawnCopy,
                { ...blackPawn.cord, moveType: [MoveType.NormalMove] },
                chessEngine,
                defaultChessboard,
                PromotionPieceType.Queen,
            );

            const bishop = defaultChessboard.getPiece({ x: 7, y: 5 }) as Piece;
            const bishopCopy = _.cloneDeep(bishop);
            defaultChessboard.makeMove(bishop, { x: 4, y: 2 });
            gameState.updatePreviousMoves(
                bishopCopy,
                { ...bishop.cord, moveType: [MoveType.NormalMove] },
                chessEngine,
                defaultChessboard,
                PromotionPieceType.Queen,
            );

            const blackKnight1 = defaultChessboard.getPiece({ x: 0, y: 1 }) as Piece;
            const blackKnight1Copy = _.cloneDeep(blackKnight1);
            defaultChessboard.makeMove(blackKnight1, { x: 2, y: 2 });
            gameState.updatePreviousMoves(
                blackKnight1Copy,
                { ...blackKnight1.cord, moveType: [MoveType.NormalMove] },
                chessEngine,
                defaultChessboard,
                PromotionPieceType.Queen,
            );

            const queen = defaultChessboard.getPiece({ x: 7, y: 3 }) as Piece;
            let queenCopy = _.cloneDeep(queen);
            defaultChessboard.makeMove(queen, { x: 3, y: 7 });
            gameState.updatePreviousMoves(
                queenCopy,
                { ...queen.cord, moveType: [MoveType.NormalMove] },
                chessEngine,
                defaultChessboard,
                PromotionPieceType.Queen,
            );

            const blackKnight2 = defaultChessboard.getPiece({ x: 0, y: 6 }) as Piece;
            const blackKnight2Copy = _.cloneDeep(blackKnight2);
            defaultChessboard.makeMove(blackKnight2, { x: 2, y: 5 });
            gameState.updatePreviousMoves(
                blackKnight2Copy,
                { ...blackKnight2.cord, moveType: [MoveType.NormalMove] },
                chessEngine,
                defaultChessboard,
                PromotionPieceType.Queen,
            );

            queenCopy = _.cloneDeep(queen);
            defaultChessboard.makeMove(queen, { x: 1, y: 5 });
            gameState.updatePreviousMoves(
                queenCopy,
                { ...queen.cord, moveType: [MoveType.Capture] },
                chessEngine,
                defaultChessboard,
                PromotionPieceType.Queen,
            );

            const actual = gameState.previousMoves;
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
});
