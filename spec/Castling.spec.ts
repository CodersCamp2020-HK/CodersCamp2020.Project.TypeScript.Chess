import { CordWithMoveType, Side } from '../src/app/domain/basicChessTypes';
import { ChessBoard } from '../src/app/infrastructure/ChessBoard';
import { ChessEngine } from '../src/app/infrastructure/ChessEngine';
import { possibleCastlingMoves } from '../src/app/utils/Castling';
import { convertEmojitoCordWithMoveType, convertEmojiToRep, displayEmojiBoard } from './Display';

const chessEng = new ChessEngine();

const emojiBoard = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '.', '.', '.', '♔', '.', '.', '♖'],
];
describe('Checking possibility of long white castling', () => {
    const emojiExpectedBoard = [
        ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
        ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '.', '🏰', '.', '♔', '♗', '♘', '♖'],
    ];
    const chessboard = new ChessBoard();
    jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard));
    const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
    it(`Then: possible moes for king should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
        const result = possibleCastlingMoves(chessboard, chessEng, Side.White, chessboard.board);
        expect(result).toEqual(expect.arrayContaining(expected));
    });
});

const emojiBoard2 = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '.', '.', '♔', '.', '.', '♖'],
];
describe('Checking possibility of short white castling', () => {
    const emojiExpectedBoard = [
        ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
        ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '♘', '.', '♛', '♔', '.', '🏰', '♖'],
    ];
    const chessboard2 = new ChessBoard();
    jest.spyOn(chessboard2, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard2));
    const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
    it(`Then: possible moes for king should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
        const result = possibleCastlingMoves(chessboard2, chessEng, Side.White, chessboard2.board);
        expect(result).toEqual(expect.arrayContaining(expected));
    });
});

const emojiBoard3 = [
    ['♜', '.', '.', '.', '♚', '.', '.', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
];
describe('Checking possibility of short black castling', () => {
    const emojiExpectedBoard = [
        ['♜', '.', '🏰', '.', '♚', '.', '🏰', '♜'],
        ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
    ];
    const chessboard3 = new ChessBoard();
    jest.spyOn(chessboard3, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard3));
    const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
    it(`Then: possible moes for king should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
        const result = possibleCastlingMoves(chessboard3, chessEng, Side.Black, chessboard3.board);
        expect(result).toEqual(expect.arrayContaining(expected));
    });
});

const emojiBoard4 = [
    ['♜', '.', '.', '♕', '♚', '♕', '.', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
];
describe('Checking possibility of short black castling', () => {
    const emojiExpectedBoard = [
        ['♜', '.', '.', '♕', '♚', '♕', '.', '♜'],
        ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
    ];
    const chessboard4 = new ChessBoard();
    jest.spyOn(chessboard4, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard4));
    const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
    it(`Then: possible moes for king should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
        const result = possibleCastlingMoves(chessboard4, chessEng, Side.Black, chessboard4.board);
        expect(result).toEqual(expect.arrayContaining(expected));
    });
});

const emojiBoard5 = [
    ['♜', '.', '.', '♕', '♚', '.', '.', '♜'],
    ['♟', '♟', '♟', '♟', '.', '♟', '♟', '♟'],
    ['.', '.', '.', '.', '♗', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
];
describe('Checking possibility of short black castling', () => {
    const emojiExpectedBoard = [
        ['♜', '.', '.', '.', '♚', '.', '.', '♜'],
        ['♟', '♟', '♟', '♟', '.', '♟', '♟', '♟'],
        ['.', '.', '.', '.', '♗', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '♘', '.', '♕', '♔', '♗', '♘', '♖'],
    ];
    const chessboard5 = new ChessBoard();
    jest.spyOn(chessboard5, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard5));
    const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
    it(`Then: possible moes for king should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
        const result = possibleCastlingMoves(chessboard5, chessEng, Side.Black, chessboard5.board);
        expect(result).toEqual(expect.arrayContaining(expected));
    });
});

const emojiBoard6 = [
    ['♜', '.', '.', '.', '♚', '♛', '.', '♜'],
    ['♟', '.', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['.', '♘', '.', '♗', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '.', '♗', '♕', '♔', '♗', '♘', '♖'],
];
describe('Checking possibility of short black castling', () => {
    const emojiExpectedBoard = [
        ['♜', '.', '.', '.', '♚', '♛', '.', '♜'],
        ['♟', '.', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['.', '♘', '.', '♗', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '.', '♗', '♕', '♔', '♗', '♘', '♖'],
    ];
    const chessboard6 = new ChessBoard();
    jest.spyOn(chessboard6, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard6));
    const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
    it(`Then: possible moes for king should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
        const result = possibleCastlingMoves(chessboard6, chessEng, Side.Black, chessboard6.board);
        expect(result).toEqual(expect.arrayContaining(expected));
    });
});

const emojiBoard7 = [
    ['♜', '.', '.', '♕', '♚', '♕', '.', '♜'],
    ['♟', '.', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['.', '.', '♘', '♗', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '.', '♗', '♕', '♔', '♗', '♘', '♖'],
];
describe('Checking possibility of short black castling', () => {
    const emojiExpectedBoard = [
        ['♜', '.', '.', '.', '♚', '♕', '.', '♜'],
        ['♟', '.', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['.', '.', '♘', '♗', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '.', '♗', '♕', '♔', '♗', '♘', '♖'],
    ];
    const chessboard7 = new ChessBoard();
    jest.spyOn(chessboard7, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard7));
    const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
    it(`Then: possible moes for king should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
        const result = possibleCastlingMoves(chessboard7, chessEng, Side.Black, chessboard7.board);
        expect(result).toEqual(expect.arrayContaining(expected));
    });
});
