import { getNormalMove } from '../src/app/infrastructure/pawnMoves';
import {
    ChessBoardRepresentation,
    CordWithMoveType,
    MoveType,
    Piece,
    PieceType,
    Side,
} from '../src/app/domain/basicChessTypes';

const pawnNormalBlack: Piece = { figType: PieceType.Pawn, cord: { x: 1, y: 6 }, side: Side.Black, isMoved: true };
const blockingPiece: Piece = { figType: PieceType.Pawn, cord: { x: 1, y: 6 }, side: Side.Black, isMoved: true };
const currentBoardMoveBlack: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, pawnNormalBlack, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
const currentBoardMoveBlackBlocked: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, blockingPiece, null, null, null, null, null, null],
    [null, pawnNormalBlack, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];
const el1: CordWithMoveType = {
    x: 1,
    y: 5,
    moveType: MoveType.NormalMove,
};
const normalBlackResult: CordWithMoveType[] = [el1];

const currentBoardMoveWhite: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
        null,
        { figType: PieceType.Pawn, cord: { x: 1, y: 6 }, side: Side.White, isMoved: true },
        null,
        null,
        null,
        null,
        null,
        null,
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

const previousBoard: ChessBoardRepresentation = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

describe('Possible Moves for Pawn', () => {
    describe('promotion', () => {
        describe('for black side', () => {
            test('7 row', () => {
                expect(true).toBeTruthy();
            });
        });
        describe('for white side', () => {
            test('2 row', () => {
                expect(true).toBeTruthy();
            });
        });
    });
    describe('pasant', () => {
        describe('for black side', () => {
            test('5 row', () => {
                expect(true).toBeTruthy();
            });
        });
        describe('for white side', () => {
            test('4 row', () => {
                expect(true).toBeTruthy();
            });
        });
    });
    describe('capture', () => {
        describe('for black side', () => {
            test('5 row', () => {
                expect(true).toBeTruthy();
            });
        });
        describe('for white side', () => {
            test('4 row', () => {
                expect(true).toBeTruthy();
            });
        });
    });
    describe('first move', () => {
        describe('for black side', () => {
            test('2 row', () => {
                expect(true).toBeTruthy();
            });
        });
        describe('for white side', () => {
            test('7 row', () => {
                expect(true).toBeTruthy();
            });
        });
    });
    describe('single move', () => {
        describe('for black side', () => {
            test('blocked', () => {
                expect(getNormalMove(pawnNormalBlack.cord, 1, currentBoardMoveBlackBlocked)).toEqual([]);
            });
            test('not blocked', () => {
                expect(getNormalMove(pawnNormalBlack.cord, 1, currentBoardMoveBlack)).toEqual(normalBlackResult);
            });
        });
        describe('for white side', () => {
            test('asd', () => {
                expect(true).toBeTruthy();
            });
        });
    });
});
