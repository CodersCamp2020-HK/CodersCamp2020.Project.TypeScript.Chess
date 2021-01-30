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
import { Cord } from '../src/app/domain/basicChessTypes';

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

const testCord: Cord = { x: 3, y: 3 };
describe(`Given: Cords ${testCord}`, () => {
    describe(`When: getBishopDirections( cord = ${JSON.stringify(testCord)}) is invoked`, () => {
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
            const actual = getBishopDirections(testCord);
            expect(actual).toMatchObject(expected);
        });
    });
    describe(`When: getKingDirections( cord = ${JSON.stringify(testCord)}) is invoked`, () => {
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
            const actual = getKingDirections(testCord);
            expect(actual).toMatchObject(expected);
        });
    });
    describe(`When: getRookDirections( cord = ${JSON.stringify(testCord)}) is invoked`, () => {
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
            const actual = getRookDirections(testCord);
            expect(actual).toMatchObject(expected);
        });
    });
});
