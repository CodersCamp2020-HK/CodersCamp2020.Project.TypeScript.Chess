import { Cord, CordWithMoveType } from '../src/app/domain/basicChessTypes';
import { ChessBoard } from '../src/app/infrastructure/ChessBoard';
import { ChessEngine } from '../src/app/infrastructure/ChessEngine';
import { convertEmojiToRep, convertEmojitoCordWithMoveType } from './Display';

const emojiBoard = [
    ['♜', '♚', '♛', '.', '.', '.', '.', '.'],
    ['.', '.', '♟', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '♖', '.', '.', '♗', '.', '.'],
    ['.', '.', '.', '.', '♙', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
];

const chessboard = new ChessBoard();
chessboard.board = convertEmojiToRep(emojiBoard);
const chessEngine = new ChessEngine();

describe(`Given: Chessboard ${emojiBoard}`, () => {
    describe(`When: getPossibleMovesForPiece for black rook is invoked`, () => {
        const emojiExpectedBoard = [
            ['♜', '♚', '♛', '.', '.', '.', '.', '.'],
            ['👟', '.', '♟', '.', '.', '.', '.', '.'],
            ['👟', '.', '.', '.', '.', '.', '.', '.'],
            ['👟', '.', '♖', '.', '.', '♗', '.', '.'],
            ['👟', '.', '.', '.', '♙', '.', '.', '.'],
            ['👟', '.', '.', '.', '.', '.', '.', '.'],
            ['👟', '.', '.', '.', '.', '.', '.', '.'],
            ['👟', '.', '.', '.', '.', '.', '.', '.'],
        ];
        const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
        it(`Then: possible moves for black rook should be:\n${emojiExpectedBoard}`, () => {
            const cord: Cord = { x: 0, y: 0 };
            const actual = chessEngine.getPossibleMovesForPiece(cord, chessboard);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
    describe(`When: getPossibleMovesForPiece for black king is invoked`, () => {
        const emojiExpectedBoard = [
            ['♜', '♚', '♛', '.', '.', '.', '.', '.'],
            ['👟', '👟', '♟', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '♖', '.', '.', '♗', '.', '.'],
            ['.', '.', '.', '.', '♙', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
        ];
        const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
        it(`Then: possible moves for black king should be:\n${emojiExpectedBoard}`, () => {
            const cord: Cord = { x: 0, y: 1 };
            const actual = chessEngine.getPossibleMovesForPiece(cord, chessboard);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
    describe(`When: getPossibleMovesForPiece for black queen is invoked`, () => {
        const emojiExpectedBoard = [
            ['♜', '♚', '♛', '👟', '👟', '👟', '👟', '👟'],
            ['.', '👟', '♟', '👟', '.', '.', '.', '.'],
            ['👟', '.', '.', '.', '👟', '.', '.', '.'],
            ['.', '.', '♖', '.', '.', '⚔️', '.', '.'],
            ['.', '.', '.', '.', '♙', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
        ];
        const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
        it(`Then: possible moves for black queen should be:\n${emojiExpectedBoard}`, () => {
            const cord: Cord = { x: 0, y: 2 };
            const actual = chessEngine.getPossibleMovesForPiece(cord, chessboard);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
    describe(`When: getPossibleMovesForPiece for white rook is invoked`, () => {
        const emojiExpectedBoard = [
            ['♜', '♚', '♛', '.', '.', '.', '.', '.'],
            ['.', '.', '♟', '.', '.', '.', '.', '.'],
            ['.', '.', '👟', '.', '.', '.', '.', '.'],
            ['👟', '👟', '♖', '👟', '👟', '♗', '.', '.'],
            ['.', '.', '👟', '.', '♙', '.', '.', '.'],
            ['.', '.', '👟', '.', '.', '.', '.', '.'],
            ['.', '.', '👟', '.', '.', '.', '.', '.'],
            ['.', '.', '👟', '.', '.', '.', '.', '.'],
        ];
        const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
        it(`Then: possible moves for white rook should be:\n${emojiExpectedBoard}`, () => {
            const cord: Cord = { x: 3, y: 2 };
            const actual = chessEngine.getPossibleMovesForPiece(cord, chessboard);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
    describe(`When: getPossibleMovesForPiece for white bishop is invoked`, () => {
        const emojiExpectedBoard = [
            ['♜', '♚', '⚔️', '.', '.', '.', '.', '.'],
            ['.', '.', '♟', '👟', '.', '.', '.', '👟'],
            ['.', '.', '.', '.', '👟', '.', '👟', '.'],
            ['.', '.', '♖', '.', '.', '♗', '.', '.'],
            ['.', '.', '.', '.', '♙', '.', '👟', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '👟'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
        ];
        const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
        it(`Then: possible moves for white bishop should be:\n${emojiExpectedBoard}`, () => {
            const cord: Cord = { x: 3, y: 5 };
            const actual = chessEngine.getPossibleMovesForPiece(cord, chessboard);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
});
