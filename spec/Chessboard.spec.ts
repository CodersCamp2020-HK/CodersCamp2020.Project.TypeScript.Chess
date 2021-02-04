import { Piece, PieceType, Side } from '../src/app/domain/basicChessTypes';
import { ChessBoard } from '../src/app/infrastructure/ChessBoard';
import { convertEmojiToRep, displayEmojiBoard } from './Display';

const emojiBoard = [
    ['.', '♞', '♝', '♛', '♚', '♝', '♞', '.'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
];
describe(`Given: chessboard: \n${displayEmojiBoard(emojiBoard)}`, () => {
    describe('When: getPieces( side = Side.Black, piece = PieceType.Rook) is invoked', () => {
        it('Then: result should be null', () => {
            const chessboard = ChessBoard.createNewBoard();
            jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard));
            const actual = chessboard.getPieces(Side.Black, PieceType.Rook);
            expect(actual).toBeNull;
        });
    });
});
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
    describe(`When: getPiece( cord = { x: 0, y: 6 }) is invoked`, () => {
        const expected: Piece = {
            cord: { x: 0, y: 6 },
            figType: PieceType.Knight,
            side: Side.Black,
            isMoved: false,
        };
        it(`Then: result should be \n${JSON.stringify(expected, null, 4)}`, () => {
            const actual = chessboard.getPiece({ x: 0, y: 6 });
            expect(actual).toEqual(expect.objectContaining(expected));
        });
    });
    describe(`When: getPiece( cord = { x: 5, y: 1 }) is invoked`, () => {
        it(`Then: result should be null`, () => {
            const actual = chessboard.getPiece({ x: 5, y: 1 });
            expect(actual).toBeNull;
        });
    });
    describe(`When: getPieces( side = Side.Black, piece = PieceType.King) is invoked`, () => {
        const expected: Piece[] = [{ cord: { x: 0, y: 4 }, figType: PieceType.King, isMoved: false, side: Side.Black }];
        it(`Then: result should be \n${JSON.stringify(expected, null, 4)}`, () => {
            const actual = chessboard.getPieces(Side.Black, PieceType.King);
            expect(actual).toEqual(expect.arrayContaining(expected));
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
