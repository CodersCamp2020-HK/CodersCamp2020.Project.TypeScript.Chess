import { getPassant, getPromotion, getSingleMove, getDoubleMove } from '../src/app/infrastructure/pawnMoves';
import * as normalMove from './pawMovesTestCases/normalMove';
import * as doubleMove from './pawMovesTestCases/doubleMove';
import {
    ChessBoardRepresentation,
    CordWithMoveType,
    MoveType,
    Piece,
    PieceType,
    Side,
} from '../src/app/domain/basicChessTypes';

describe('Possible Moves for Pawn', () => {
    describe('promotion', () => {
        describe('for black side', () => {
            test('blocked', () => {
                //expect(getPromotion(pawnNormalBlack.cord, 1, currentBoardMoveBlackBlocked)).toEqual([]);
            });
            test('not blocked', () => {
                //expect(getPromotion(pawnNormalBlack.cord, 1, currentBoardMoveBlackBlocked)).toEqual([]);
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
            test('blocked', () => {
                expect(
                    getDoubleMove(doubleMove.pawnDoubleBlack.cord, 1, doubleMove.currentBoardMoveBlackBlocked),
                ).toEqual([]);
            });
            test('not blocked', () => {
                expect(getDoubleMove(doubleMove.pawnDoubleBlack.cord, 1, doubleMove.currentBoardMoveBlack)).toEqual(
                    doubleMove.doubleBlackResult,
                );
            });
        });
        describe('for white side', () => {
            test('blocked', () => {
                expect(
                    getDoubleMove(doubleMove.pawnDoubleWhite.cord, -1, doubleMove.currentBoardMoveWhiteBlocked),
                ).toEqual([]);
            });
            test('not blocked', () => {
                expect(getDoubleMove(doubleMove.pawnDoubleWhite.cord, -1, doubleMove.currentBoardMoveWhite)).toEqual(
                    doubleMove.doubleWhiteResult,
                );
            });
        });
    });

    describe('single move', () => {
        describe('for black side', () => {
            test('blocked', () => {
                expect(
                    getSingleMove(normalMove.pawnNormalBlack.cord, 1, normalMove.currentBoardMoveBlackBlocked),
                ).toEqual([]);
            });
            test('not blocked', () => {
                expect(getSingleMove(normalMove.pawnNormalBlack.cord, 1, normalMove.currentBoardMoveBlack)).toEqual(
                    normalMove.normalBlackResult,
                );
            });
        });
        describe('for white side', () => {
            test('blocked', () => {
                expect(
                    getSingleMove(normalMove.pawnNormalWhite.cord, -1, normalMove.currentBoardMoveWhiteBlocked),
                ).toEqual([]);
            });
            test('not blocked', () => {
                expect(getSingleMove(normalMove.pawnNormalWhite.cord, -1, normalMove.currentBoardMoveWhite)).toEqual(
                    normalMove.normalWhiteResult,
                );
            });
        });
    });
});
