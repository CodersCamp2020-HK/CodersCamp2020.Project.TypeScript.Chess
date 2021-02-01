import {
    possibleEnPassantMoves,
    possiblePromotionMoves,
    possibleNormalMoves,
    possibleCaptureMoves,
    getPossibleMovesForPawn,
} from '../src/app/infrastructure/pawnMoves';
import * as normalMove from './pawMovesTestCases/normalMove';
import * as doubleMove from './pawMovesTestCases/doubleMove';
import * as captureMove from './pawMovesTestCases/captureMove';
import * as passantMove from './pawMovesTestCases/enPassantMove';
import * as promotionMove from './pawMovesTestCases/promotionMove';
import * as allMoves from './pawMovesTestCases/allMoves';

describe('Possible Moves for Pawn', () => {
    describe('promotion', () => {
        describe('for black piece', () => {
            test('blocked by white side in front of', () => {
                expect(
                    possiblePromotionMoves(
                        promotionMove.currentPawnBlack.cord,
                        1,
                        promotionMove.currentBoardPromotionForBlackBlockedByPiece,
                    ),
                ).toEqual([]);
            });
            test('not blocked - empty tile in front of', () => {
                expect(
                    possiblePromotionMoves(
                        promotionMove.currentPawnBlack.cord,
                        1,
                        promotionMove.currentBoardPromotionForBlack,
                    ),
                ).toEqual(promotionMove.promotionForBlackResult);
            });
            test('with capture possible', () => {
                expect(
                    possiblePromotionMoves(
                        promotionMove.currentPawnBlack.cord,
                        1,
                        promotionMove.currentBoardPromotionForBlackWithCapturePossible,
                    ),
                ).toEqual(promotionMove.promotionBlackResultWithCapture);
            });
        });
        describe('for white piece', () => {
            test('blocked by black piece in front of', () => {
                expect(
                    possiblePromotionMoves(
                        promotionMove.currentPawnWhite.cord,
                        -1,
                        promotionMove.currentBoardPromotionForWhiteBlockedByBlack,
                    ),
                ).toEqual([]);
            });
            test('not blocked - empty tile in front of', () => {
                expect(
                    possiblePromotionMoves(
                        promotionMove.currentPawnWhite.cord,
                        -1,
                        promotionMove.currentBoardPromotionForWhite,
                    ),
                ).toEqual(promotionMove.promotionForWhiteResults);
            });
            test('blocked by black piece with captures possible', () => {
                expect(
                    possiblePromotionMoves(
                        promotionMove.currentPawnWhite.cord,
                        -1,
                        promotionMove.currentBoardPromotionForWhiteWithTwoCaptures,
                    ),
                ).toEqual(promotionMove.promotionWhiteResultBlockedByTwoCaptures);
            });
        });
    });

    describe('pasant', () => {
        describe('for black piece', () => {
            test('possible from two sides', () => {
                expect(
                    possibleEnPassantMoves(
                        passantMove.currentPawnBlack.cord,
                        1,
                        passantMove.currentBoardPassantForBlack,
                        passantMove.previousBoardPassantForBlack,
                    ),
                ).toEqual(passantMove.passantForBlackResult);
            });
        });
        describe('for white piece', () => {
            test('posible from two sides', () => {
                expect(
                    possibleEnPassantMoves(
                        passantMove.currentPawnWhite.cord,
                        -1,
                        passantMove.currentBoardPassantForWhite,
                        passantMove.previousBoardMoveWhite,
                    ),
                ).toEqual(passantMove.passantForWhiteResults);
            });
            test('possible from only one side', () => {
                expect(
                    possibleEnPassantMoves(
                        passantMove.pawnWhiteBySide.cord,
                        -1,
                        passantMove.currentBoardMoveWhiteOneSide,
                        passantMove.previousBoardMoveWhiteOneSide,
                    ),
                ).toEqual(passantMove.passantWhiteResultOneSide);
            });
        });
    });

    describe('capture', () => {
        describe('for black piece', () => {
            test('possible for left and right top corner', () => {
                expect(
                    possibleCaptureMoves(captureMove.currentPawnBlack.cord, 1, captureMove.currentBoardCaptureBlack),
                ).toEqual(captureMove.captureBlackResults);
            });
        });
        describe('for white piece', () => {
            test('possible left and right bottom corner ', () => {
                expect(
                    possibleCaptureMoves(
                        captureMove.currentPawnWhite.cord,
                        -1,
                        captureMove.currentBoardCaptureForWhite,
                    ),
                ).toEqual(captureMove.captureWhiteResults);
            });
            test('possible one corner', () => {
                expect(
                    possibleCaptureMoves(
                        captureMove.currentPawnWhiteOneSide.cord,
                        -1,
                        captureMove.currentBoardMoveWhiteOneSide,
                    ),
                ).toEqual(captureMove.captureWhiteBlockedByOneSideResults);
            });
        });
    });

    describe('first move', () => {
        describe('for black piece', () => {
            test('blocked by white piece in front of', () => {
                expect(
                    possibleNormalMoves(doubleMove.currentPawnBlack.cord, 2, doubleMove.currentBoardMoveBlackBlocked),
                ).toEqual([]);
            });
            test('not blocked - empty tile in front of', () => {
                expect(
                    possibleNormalMoves(doubleMove.currentPawnBlack.cord, 2, doubleMove.currentBoardMoveForBlack),
                ).toEqual(doubleMove.moveForBlackResults);
            });
        });
        describe('for white piece', () => {
            test('blocked by black piece in front of', () => {
                expect(
                    possibleNormalMoves(doubleMove.currentPawnWhite.cord, -2, doubleMove.currentBoardMoveForWhiteBlocked),
                ).toEqual([]);
            });
            test('not blocked - empty tile in front of', () => {
                expect(
                    possibleNormalMoves(doubleMove.currentPawnWhite.cord, -2, doubleMove.currentBoardMoveForWhite),
                ).toEqual(doubleMove.moveForWhiteResults);
            });
        });
    });

    describe('single move', () => {
        describe('for black piece', () => {
            test('blocked by white piece in front of', () => {
                expect(
                    possibleNormalMoves(normalMove.pawnNormalBlack.cord, 1, normalMove.currentBoardMoveForBlackBlocked),
                ).toEqual([]);
            });
            test('not blocked - empty tile in front of', () => {
                expect(
                    possibleNormalMoves(normalMove.pawnNormalBlack.cord, 1, normalMove.currentBoardMoveForBlack),
                ).toEqual(normalMove.moveForBlackResults);
            });
        });
        describe('for white piece', () => {
            test('blocked by white piece in front of', () => {
                expect(
                    possibleNormalMoves(normalMove.pawnNormalWhite.cord, -1, normalMove.currentBoardMoveForWhiteBlocked),
                ).toEqual([]);
            });
            test('not blocked - empty tile in front of', () => {
                expect(
                    possibleNormalMoves(normalMove.pawnNormalWhite.cord, -1, normalMove.currentBoardMoveForWhite),
                ).toEqual(normalMove.moveForWhiteResults);
            });
        });
    });
});

const ichess = {
    board: allMoves.currentBoardCaptureBlack,
    makeMove: () => {
        return true;
    },
    hasPiece: () => {
        return true;
    },
};
const ichessprevious = {
    board: allMoves.currentBoardCaptureBlackBefore,
    makeMove: () => {
        return true;
    },
    hasPiece: () => {
        return true;
    },
};

describe('All possible moves', () => {
    describe('should return capture, normal and passant move possible', () => {
        describe('for black piece', () => {
            test('not blocked - empty tile in front of, capture for left and passant for right', () => {
                expect(getPossibleMovesForPawn(allMoves.currentPawnBlack.cord, ichess, ichessprevious)).toEqual(
                    allMoves.captureBlackResult,
                );
            });
        });
    });
});
