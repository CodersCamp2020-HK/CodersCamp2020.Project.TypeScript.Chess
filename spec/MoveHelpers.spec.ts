import {
    getBishopDirections,
    getRookDirections,
    getKingDirections,
    removeMovesOutsideChessBoard,
    getOtherPiecesCord,
    excludeMovesBehindPiece,
    removeMovesBlockedByPiece,
    getMoveTypesForPiece,
} from '../src/app/utils/MoveHelpers';
import { displayChessboard, displayMoves } from '../src/app/utils/Display';
import { ChessBoard } from '../src/app/infrastructure/ChessBoard';
import { Cord, PossibleCords } from '../src/app/domain/basicChessTypes';

const chessboard = new ChessBoard();
chessboard.board = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

const testCordDirections: Cord = { x: 3, y: 3 };
describe(`Given: Cords ${testCordDirections}`, () => {
    describe(`When: getBishopDirections( cord = ${JSON.stringify(testCordDirections)}) is invoked`, () => {
        const expected: Cord[] = [
            { x: 4, y: 4 },
            { x: 5, y: 5 },
            { x: 6, y: 6 },
            { x: 7, y: 7 },
            { x: 4, y: 2 },
            { x: 5, y: 1 },
            { x: 6, y: 0 },
            { x: 2, y: 4 },
            { x: 1, y: 5 },
            { x: 0, y: 6 },
            { x: 2, y: 2 },
            { x: 1, y: 1 },
            { x: 0, y: 0 },
        ];
        it('Then: possible moves should be: ', () => {
            const actual = getBishopDirections(testCordDirections);
            expect(actual).toMatchObject(expected);
        });
    });
    describe(`When: getKingDirections( cord = ${JSON.stringify(testCordDirections)}) is invoked`, () => {
        const expected: Cord[] = [
            { x: 2, y: 3 },
            { x: 4, y: 3 },
            { x: 3, y: 2 },
            { x: 3, y: 4 },
            { x: 2, y: 2 },
            { x: 2, y: 4 },
            { x: 4, y: 2 },
            { x: 4, y: 4 },
        ];
        it('Then: possible moves should be: ', () => {
            const actual = getKingDirections(testCordDirections);
            expect(actual).toMatchObject(expected);
        });
    });
    describe(`When: getRookDirections( cord = ${JSON.stringify(testCordDirections)}) is invoked`, () => {
        const expected: Cord[] = [
            { x: 3, y: 0 },
            { x: 3, y: 1 },
            { x: 3, y: 2 },
            { x: 3, y: 4 },
            { x: 3, y: 5 },
            { x: 3, y: 6 },
            { x: 3, y: 7 },
            { x: 0, y: 3 },
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 4, y: 3 },
            { x: 5, y: 3 },
            { x: 6, y: 3 },
            { x: 7, y: 3 },
        ];
        it('Then: possible moves should be: ', () => {
            const actual = getRookDirections(testCordDirections);
            expect(actual).toMatchObject(expected);
        });
    });
});

const testCordsOutsideBoard: PossibleCords[] = [
    { x: -5, y: -2 },
    { x: 0, y: -2 },
    { x: 1, y: 1 },
    { x: 2, y: 3 },
    { x: 4, y: 0 },
    { x: -2, y: 0 },
    { x: 0, y: 0 },
    { x: -52321312, y: 1902 },
    { x: 2, y: -2213232131 },
    { x: 2, y: 2213232131 },
    { x: 89348934839483, y: 5 },
];
describe(`Given: List of cords: ${displayMoves(testCordsOutsideBoard)}`, () => {
    describe(`When: removeMovesOutsideChessBoard is invoked with that list of cords`, () => {
        const expected: Cord[] = [
            { x: 1, y: 1 },
            { x: 2, y: 3 },
            { x: 4, y: 0 },
            { x: 0, y: 0 },
        ];
        it(`Then: list of cords should be ${displayMoves(expected)}`, () => {
            const actual = removeMovesOutsideChessBoard(testCordsOutsideBoard);
            expect(actual).toMatchObject(expected);
        });
    });
});
