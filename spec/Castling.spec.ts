import { CordWithMoveType, Side } from '../src/app/domain/basicChessTypes';
import { ChessBoard } from '../src/app/infrastructure/ChessBoard';
import { possibleCastlingMoves } from '../src/app/utils/Castling';
import { convertEmojitoCordWithMoveType, convertEmojiToRep, displayEmojiBoard } from './Display';

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
        const result = possibleCastlingMoves(chessboard, Side.White);
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
    const chessboard = new ChessBoard();
    jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard2));
    const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
    it(`Then: possible moes for king should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
        const result = possibleCastlingMoves(chessboard, Side.White);
        expect(result).toEqual(expect.arrayContaining(expected));
    });
});

const emojiBoard3 = [
    ['♜', '.', '.', '.', '♚', '.', '.', '♜'],
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
        ['♜', '.', '🏰', '.', '♚', '.', '🏰', '♜'],
        ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
    ];
    const chessboard = new ChessBoard();
    jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard3));
    const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
    it(`Then: possible moes for king should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
        const result = possibleCastlingMoves(chessboard, Side.Black);
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
    const chessboard = new ChessBoard();
    jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard4));
    const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
    it(`Then: possible moes for king should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
        const result = possibleCastlingMoves(chessboard, Side.Black);
        expect(result).toEqual(expect.arrayContaining(expected));
    });
});
