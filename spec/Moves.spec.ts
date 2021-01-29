import { getPossibleMovesForBishop, getPossibleMovesForQueen, getPossibleMovesForRook } from '../src/app/utils/Moves';
import { CordWithMoveType, Piece, PieceType, Side } from '../src/app/domain/basicChessTypes';
import { ChessBoard } from '../src/app/infrastructure/ChessBoard';

describe(`Given: Chessboard with bishop on square { x: 3, y: 3 }`, () => {
    const bishop: Piece = {
        figType: PieceType.Bishop,
        side: Side.Black,
        isMoved: false,
        cord: { x: 3, y: 3 },
    };
    const chessboard = new ChessBoard();
    chessboard.board = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, bishop, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ];
    describe('When: getPossibleMovesForBishop is invoked', () => {
        const expected: CordWithMoveType[] = [
            { x: 4, y: 4, moveType: 0 },
            { x: 5, y: 5, moveType: 0 },
            { x: 6, y: 6, moveType: 0 },
            { x: 7, y: 7, moveType: 0 },
            { x: 4, y: 2, moveType: 0 },
            { x: 5, y: 1, moveType: 0 },
            { x: 6, y: 0, moveType: 0 },
            { x: 2, y: 4, moveType: 0 },
            { x: 1, y: 5, moveType: 0 },
            { x: 0, y: 6, moveType: 0 },
            { x: 2, y: 2, moveType: 0 },
            { x: 1, y: 1, moveType: 0 },
            { x: 0, y: 0, moveType: 0 },
        ];
        it(`Then: Cords array should be ${JSON.stringify(expected, null, 4)}`, () => {
            const actual = getPossibleMovesForBishop({ x: 3, y: 3 }, chessboard);
            expect(actual).toEqual(expected);
        });
    });
});

describe(`Given: Chessboard with rook on square { x: 0, y: 0 }`, () => {
    const rook: Piece = {
        figType: PieceType.Rook,
        side: Side.White,
        isMoved: false,
        cord: { x: 3, y: 3 },
    };
    const chessboard = new ChessBoard();
    chessboard.board = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, rook, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ];
    describe('When: getPossibleMovesForRook is invoked', () => {
        const expected: CordWithMoveType[] = [
            { x: 3, y: 0, moveType: 0 },
            { x: 3, y: 1, moveType: 0 },
            { x: 3, y: 2, moveType: 0 },
            { x: 3, y: 4, moveType: 0 },
            { x: 3, y: 5, moveType: 0 },
            { x: 3, y: 6, moveType: 0 },
            { x: 3, y: 7, moveType: 0 },
            { x: 0, y: 3, moveType: 0 },
            { x: 1, y: 3, moveType: 0 },
            { x: 2, y: 3, moveType: 0 },
            { x: 4, y: 3, moveType: 0 },
            { x: 5, y: 3, moveType: 0 },
            { x: 6, y: 3, moveType: 0 },
            { x: 7, y: 3, moveType: 0 },
        ];
        it(`Then: Cords array should be ${JSON.stringify(expected, null, 4)}`, () => {
            const actual = getPossibleMovesForRook({ x: 3, y: 3 }, chessboard);
            expect(actual).toEqual(expected);
        });
    });
});

describe(`Given: Chessboard with queen on square { x: 3, y: 3 }`, () => {
    const queen: Piece = {
        figType: PieceType.Rook,
        side: Side.White,
        isMoved: false,
        cord: { x: 3, y: 3 },
    };
    const chessboard = new ChessBoard();
    chessboard.board = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, queen, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ];
    describe('When: getPossibleMovesForQueen is invoked', () => {
        const expected: CordWithMoveType[] = [
            { x: 4, y: 4, moveType: 0 },
            { x: 5, y: 5, moveType: 0 },
            { x: 6, y: 6, moveType: 0 },
            { x: 7, y: 7, moveType: 0 },
            { x: 4, y: 2, moveType: 0 },
            { x: 5, y: 1, moveType: 0 },
            { x: 6, y: 0, moveType: 0 },
            { x: 2, y: 4, moveType: 0 },
            { x: 1, y: 5, moveType: 0 },
            { x: 0, y: 6, moveType: 0 },
            { x: 2, y: 2, moveType: 0 },
            { x: 1, y: 1, moveType: 0 },
            { x: 0, y: 0, moveType: 0 },
            { x: 3, y: 0, moveType: 0 },
            { x: 3, y: 1, moveType: 0 },
            { x: 3, y: 2, moveType: 0 },
            { x: 3, y: 4, moveType: 0 },
            { x: 3, y: 5, moveType: 0 },
            { x: 3, y: 6, moveType: 0 },
            { x: 3, y: 7, moveType: 0 },
            { x: 0, y: 3, moveType: 0 },
            { x: 1, y: 3, moveType: 0 },
            { x: 2, y: 3, moveType: 0 },
            { x: 4, y: 3, moveType: 0 },
            { x: 5, y: 3, moveType: 0 },
            { x: 6, y: 3, moveType: 0 },
            { x: 7, y: 3, moveType: 0 },
        ];
        it(`Then: Cords array should be ${JSON.stringify(expected, null, 4)}`, () => {
            const actual = getPossibleMovesForQueen({ x: 3, y: 3 }, chessboard);
            expect(actual).toEqual(expected);
        });
    });
});
