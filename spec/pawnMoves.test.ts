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
import {
    ChessBoardRepresentation,
    CordWithMoveType,
    IChessBoard,
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
                    possiblePromotionMoves(
                        promotionMove.currentPawnBlack.cord,
                        1,
                        promotionMove.currentBoardPromotionBlackBlocked,
                    ),
                ).toEqual([]);
            });
            test('not blocked', () => {
                expect(
                    possiblePromotionMoves(
                        promotionMove.currentPawnBlack.cord,
                        1,
                        promotionMove.currentBoardPromotionBlack,
                    ),
                ).toEqual(promotionMove.promotionBlackResult);
            });
            test('with capture possible', () => {
                expect(
                    possiblePromotionMoves(
                        promotionMove.currentPawnBlack.cord,
                        1,
                        promotionMove.currentBoardPromotionBlackWithCapture,
                    ),
                ).toEqual(promotionMove.promotionBlackResultWithCapture);
            });
        });
        describe('for white side', () => {
            test('blocked', () => {
                expect(
                    possiblePromotionMoves(
                        promotionMove.pawnWhite.cord,
                        -1,
                        promotionMove.currentBoardMoveWhiteBlocked,
                    ),
                ).toEqual([]);
            });
            test('not blocked', () => {
                expect(
                    possiblePromotionMoves(promotionMove.pawnWhite.cord, -1, promotionMove.currentBoardMoveWhite),
                ).toEqual(promotionMove.promotionWhiteResult);
            });
            test('blocked with captures possible', () => {
                expect(
                    possiblePromotionMoves(
                        promotionMove.pawnWhite.cord,
                        -1,
                        promotionMove.currentBoardMoveWhiteWithTwoCaptures,
                    ),
                ).toEqual(promotionMove.promotionWhiteResultBlockedTwoCaptures);
            });
        });
    });

    describe('pasant', () => {
        describe('for black side', () => {
            test('two side', () => {
                expect(
                    possibleEnPassantMoves(
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
                    possibleEnPassantMoves(
                        passantMove.currentPawnWhite.cord,
                        -1,
                        passantMove.currentBoardMoveWhite,
                        passantMove.currentBoardMoveWhiteBefore,
                    ),
                ).toEqual(passantMove.passantWhiteResult);
            });
            test('one side', () => {
                expect(
                    possibleEnPassantMoves(
                        passantMove.pawnWhiteBySide.cord,
                        -1,
                        passantMove.currentBoardMoveWhiteOneSide,
                        passantMove.currentBoardMoveWhiteOneSideBefore,
                    ),
                ).toEqual(passantMove.passantWhiteResultOneSide);
            });
        });
    });

    describe('capture', () => {
        describe('for black side', () => {
            test('left and right', () => {
                expect(
                    possibleCaptureMoves(captureMove.currentPawnBlack.cord, 1, captureMove.currentBoardCaptureBlack),
                ).toEqual(captureMove.captureBlackResult);
            });
        });
        describe('for white side', () => {
            test('left and right', () => {
                expect(
                    possibleCaptureMoves(captureMove.currentPawnWhite.cord, -1, captureMove.currentBoardMoveWhite),
                ).toEqual(captureMove.captureWhiteResult);
            });
            test('one side', () => {
                expect(
                    possibleCaptureMoves(
                        captureMove.currentPawnWhiteOneSide.cord,
                        -1,
                        captureMove.currentBoardMoveWhiteOneSide,
                    ),
                ).toEqual(captureMove.captureWhiteResultOneSide);
            });
        });
    });

    describe('first move', () => {
        describe('for black side', () => {
            test('blocked', () => {
                expect(
                    possibleNormalMoves(doubleMove.pawnDoubleBlack.cord, 2, doubleMove.currentBoardMoveBlackBlocked),
                ).toEqual([]);
            });
            test('not blocked', () => {
                expect(
                    possibleNormalMoves(doubleMove.pawnDoubleBlack.cord, 2, doubleMove.currentBoardMoveBlack),
                ).toEqual(doubleMove.doubleBlackResult);
            });
        });
        describe('for white side', () => {
            test('blocked', () => {
                expect(
                    possibleNormalMoves(doubleMove.pawnDoubleWhite.cord, -2, doubleMove.currentBoardMoveWhiteBlocked),
                ).toEqual([]);
            });
            test('not blocked', () => {
                expect(
                    possibleNormalMoves(doubleMove.pawnDoubleWhite.cord, -2, doubleMove.currentBoardMoveWhite),
                ).toEqual(doubleMove.doubleWhiteResult);
            });
        });
    });

    describe('single move', () => {
        describe('for black side', () => {
            test('blocked', () => {
                expect(
                    possibleNormalMoves(normalMove.pawnNormalBlack.cord, 1, normalMove.currentBoardMoveBlackBlocked),
                ).toEqual([]);
            });
            test('not blocked', () => {
                expect(
                    possibleNormalMoves(normalMove.pawnNormalBlack.cord, 1, normalMove.currentBoardMoveBlack),
                ).toEqual(normalMove.normalBlackResult);
            });
        });
        describe('for white side', () => {
            test('blocked', () => {
                expect(
                    possibleNormalMoves(normalMove.pawnNormalWhite.cord, -1, normalMove.currentBoardMoveWhiteBlocked),
                ).toEqual([]);
            });
            test('not blocked', () => {
                expect(
                    possibleNormalMoves(normalMove.pawnNormalWhite.cord, -1, normalMove.currentBoardMoveWhite),
                ).toEqual(normalMove.normalWhiteResult);
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

describe('All possible', () => {
    describe('capture normal passant', () => {
        describe('for black side', () => {
            test('not blocked', () => {
                expect(getPossibleMovesForPawn(allMoves.currentPawnBlack.cord, ichess, ichessprevious)).toEqual(
                    allMoves.captureBlackResult,
                );
            });
        });
    });
});
