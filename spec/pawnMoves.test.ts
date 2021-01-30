import {
    getPassant,
    getPromotion,
    getSingleMove,
    getDoubleMove,
    getCapture,
} from '../src/app/infrastructure/pawnMoves';
import * as normalMove from './pawMovesTestCases/normalMove';
import * as doubleMove from './pawMovesTestCases/doubleMove';
import * as captureMove from './pawMovesTestCases/captureMove';
import * as passantMove from './pawMovesTestCases/enPassantMove';
import * as promotionMove from './pawMovesTestCases/promotionMove';
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
                expect(
                    getPromotion(
                        promotionMove.currentPawnBlack.cord,
                        1,
                        promotionMove.currentBoardPromotionBlackBlocked,
                    ),
                ).toEqual([]);
            });
            test('not blocked', () => {
                expect(
                    getPromotion(promotionMove.currentPawnBlack.cord, 1, promotionMove.currentBoardPromotionBlack),
                ).toEqual(promotionMove.promotionBlackResult);
            });
        });
        describe('for white side', () => {
            test('blocked', () => {
                expect(
                    getPromotion(promotionMove.pawnWhite.cord, -1, promotionMove.currentBoardMoveWhiteBlocked),
                ).toEqual([]);
            });
            test('not blocked', () => {
                expect(getPromotion(promotionMove.pawnWhite.cord, -1, promotionMove.currentBoardMoveWhite)).toEqual(
                    promotionMove.promotionWhiteResult,
                );
            });
        });
    });

    describe('pasant', () => {
        describe('for black side', () => {
            test('two side', () => {
                expect(
                    getPassant(
                        passantMove.currentPawnBlack.cord,
                        1,
                        passantMove.currentBoardPassantBlack,
                        passantMove.currentBoardPassantBlackBefore,
                    ),
                ).toEqual(passantMove.passantBlackResult);
            });
        });
        describe('for white side', () => {
            test('two side', () => {
                expect(
                    getPassant(
                        passantMove.currentPawnWhite.cord,
                        -1,
                        passantMove.currentBoardMoveWhite,
                        passantMove.currentBoardMoveWhiteBefore,
                    ),
                ).toEqual(passantMove.passantWhiteResult);
            });
        });
    });

    describe('capture', () => {
        describe('for black side', () => {
            test('left and right', () => {
                expect(getCapture(captureMove.currentPawnBlack.cord, 1, captureMove.currentBoardCaptureBlack)).toEqual(
                    captureMove.captureBlackResult,
                );
            });
        });
        describe('for white side', () => {
            test('left and right', () => {
                expect(getCapture(captureMove.currentPawnWhite.cord, -1, captureMove.currentBoardMoveWhite)).toEqual(
                    captureMove.captureWhiteResult,
                );
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
