import { Piece } from '../src/app/domain/basicChessTypes';
import { ChessBoard } from '../src/app/infrastructure/ChessBoard';
import { convertEmojiToRep, displayEmojiBoard } from './Display';

describe(`Given: Starting chessboard :`, () => {
    const chessboard = ChessBoard.createNewBoard();
    describe(`When: no piece has moved`, () => {
        const expectedEmoji = [
            ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
            ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
            ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
        ];
        const expected = convertEmojiToRep(expectedEmoji);
        it(`Then: board should look like: \n${displayEmojiBoard(expectedEmoji)}`, () => {
            expect(chessboard.board).toEqual(expect.arrayContaining(expected));
        });
    });
    describe(`When: white piece moved from { x: 6, y: 4 } to { x: 4, y: 4 }`, () => {
        const expectedEmoji = [
            ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
            ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '♙', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['♙', '♙', '♙', '♙', '.', '♙', '♙', '♙'],
            ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
        ];
        const expected = convertEmojiToRep(expectedEmoji);
        it(`Then: board should look like: \n${displayEmojiBoard(expectedEmoji)}`, () => {
            const pawn = chessboard.getPiece({ x: 6, y: 4 }) as Piece;
            chessboard.makeMove(pawn, { x: 4, y: 4 });
            expect(chessboard.board).toEqual(expect.arrayContaining(expected));
        });
    });
});
