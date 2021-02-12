import { Cord, CordWithMoveType, Side } from '../src/app/domain/basicChessTypes';
import { ChessBoard } from '../src/app/infrastructure/ChessBoard';
import { ChessEngine } from '../src/app/infrastructure/ChessEngine';
import { convertEmojitoCordWithMoveType, convertEmojiToRep, displayEmojiBoard } from './Display';
import _ from 'lodash';

const emojiBoard = [
    ['♜', '♚', '♛', '.', '.', '.', '.', '.'],
    ['.', '.', '♟', '♞', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '♖', '.', '.', '♗', '.', '.'],
    ['.', '.', '.', '.', '♙', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
];

const chessboard = new ChessBoard();
jest.spyOn(chessboard, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard));
const chessEngine = new ChessEngine();

describe(`Given: Chessboard ${displayEmojiBoard(emojiBoard)}`, () => {
    describe(`When: getPossibleMovesForPiece for black rook is invoked`, () => {
        const emojiExpectedBoard = [
            ['♜', '♚', '♛', '.', '.', '.', '.', '.'],
            ['👟', '.', '♟', '♞', '.', '.', '.', '.'],
            ['👟', '.', '.', '.', '.', '.', '.', '.'],
            ['👟', '.', '♖', '.', '.', '♗', '.', '.'],
            ['👟', '.', '.', '.', '♙', '.', '.', '.'],
            ['👟', '.', '.', '.', '.', '.', '.', '.'],
            ['👟', '.', '.', '.', '.', '.', '.', '.'],
            ['👟', '.', '.', '.', '.', '.', '.', '.'],
        ];
        const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
        it(`Then: possible moves for black rook should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
            const cord: Cord = { x: 0, y: 0 };
            const actual = chessEngine.getPossibleMovesForPiece(cord, chessboard);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
    describe(`When: getPossibleMovesForPiece for black king is invoked`, () => {
        const emojiExpectedBoard = [
            ['♜', '♚', '♛', '.', '.', '.', '.', '.'],
            ['👟', '👟', '♟', '♞', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '♖', '.', '.', '♗', '.', '.'],
            ['.', '.', '.', '.', '♙', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
        ];
        const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
        it(`Then: possible moves for black king should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
            const cord: Cord = { x: 0, y: 1 };
            const actual = chessEngine.getPossibleMovesForPiece(cord, chessboard);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
    describe(`When: getPossibleMovesForPiece for black queen is invoked`, () => {
        const emojiExpectedBoard = [
            ['♜', '♚', '♛', '👟', '👟', '👟', '👟', '👟'],
            ['.', '👟', '♟', '♞', '.', '.', '.', '.'],
            ['👟', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '♖', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '♙', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
        ];
        const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
        it(`Then: possible moves for black queen should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
            const cord: Cord = { x: 0, y: 2 };
            const actual = chessEngine.getPossibleMovesForPiece(cord, chessboard);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
    describe(`When: getPossibleMovesForPiece for white rook is invoked`, () => {
        const emojiExpectedBoard = [
            ['♜', '♚', '♛', '.', '.', '.', '.', '.'],
            ['.', '.', '♟', '♞', '.', '.', '.', '.'],
            ['.', '.', '👟', '.', '.', '.', '.', '.'],
            ['👟', '👟', '♖', '👟', '👟', '♗', '.', '.'],
            ['.', '.', '👟', '.', '♙', '.', '.', '.'],
            ['.', '.', '👟', '.', '.', '.', '.', '.'],
            ['.', '.', '👟', '.', '.', '.', '.', '.'],
            ['.', '.', '👟', '.', '.', '.', '.', '.'],
        ];
        const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
        it(`Then: possible moves for white rook should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
            const cord: Cord = { x: 3, y: 2 };
            const actual = chessEngine.getPossibleMovesForPiece(cord, chessboard);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
    describe(`When: getPossibleMovesForPiece for white bishop is invoked`, () => {
        const emojiExpectedBoard = [
            ['♜', '♚', '♛', '.', '.', '.', '.', '.'],
            ['.', '.', '♟', '⚔️', '.', '.', '.', '👟'],
            ['.', '.', '.', '.', '👟', '.', '👟', '.'],
            ['.', '.', '♖', '.', '.', '♗', '.', '.'],
            ['.', '.', '.', '.', '♙', '.', '👟', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '👟'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
        ];
        const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
        it(`Then: possible moves for white bishop should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
            const cord: Cord = { x: 3, y: 5 };
            const actual = chessEngine.getPossibleMovesForPiece(cord, chessboard);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
    describe(`When: getPossibleMovesForPiece for black knight is invoked`, () => {
        const emojiExpectedBoard = [
            ['♜', '♚', '♛', '.', '.', '👟', '.', '.'],
            ['.', '.', '♟', '♞', '.', '.', '.', '.'],
            ['.', '👟', '.', '.', '.', '👟', '.', '.'],
            ['.', '.', '⚔️', '.', '👟', '♗', '.', '.'],
            ['.', '.', '.', '.', '♙', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
        ];
        const expected: CordWithMoveType[] = convertEmojitoCordWithMoveType(emojiExpectedBoard);
        it(`Then: possible moves for white bishop should be:\n${displayEmojiBoard(emojiExpectedBoard)}`, () => {
            const cord: Cord = { x: 1, y: 3 };
            const actual = chessEngine.getPossibleMovesForPiece(cord, chessboard);
            expect(actual).toEqual(expect.arrayContaining(expected));
        });
    });
});

// const whiteSideNoHasCheck = [
//     [
//         ['♜', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '♔'],
//     ],
//     [
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['♜', '.', '.', '♖', '.', '.', '.', '♔'],
//     ],
//     [
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '♔', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//     ],
//     [
//         ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
//         ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
//         ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
//     ],
// ];
// describe(`Given: Chessboard : `, () => {
//     describe(`When: isCheck is invoked on given board`, () => {
//         const expectedWhite = false;
//         whiteSideNoHasCheck.map((emojiBoard) => {
//             const chessboardCheck = ChessBoard.createNewBoard();
//             jest.spyOn(chessboardCheck, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard));
//             it(`Then: there is no check on white side`, () => {
//                 const actual = chessEngine.isCheck(chessboardCheck, Side.White);
//                 expect(actual).toBe(expectedWhite);
//             });
//         });
//     });
// });

// const whiteSideHasCheck = [
//     [
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['♜', '.', '.', '.', '.', '.', '.', '♔'],
//     ],
//     [
//         ['.', '.', '.', '.', '.', '.', '.', '♜'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['♜', '.', '.', '.', '♖', '.', '.', '♔'],
//     ],
//     [
//         ['♝', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['♜', '.', '.', '.', '♖', '.', '.', '♔'],
//     ],
// ];
// describe(`Given: Chessboard : `, () => {
//     describe(`When: isCheck is invoked on given board`, () => {
//         const result = true;
//         whiteSideHasCheck.map((emojiBoard) => {
//             const chessboardCheck = ChessBoard.createNewBoard();
//             jest.spyOn(chessboardCheck, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard));
//             it(`Then: there is check on white side`, () => {
//                 const actual = chessEngine.isCheck(chessboardCheck, Side.White);
//                 expect(actual).toBe(result);
//             });
//         });
//     });
// });

// const blackSideNoHasCheck = [
//     [
//         ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
//         ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
//         ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
//     ],
//     [
//         ['♖', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '♚', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//     ],
// ];
// describe(`Given: Chessboard : `, () => {
//     describe(`When: isCheck is invoked on given board`, () => {
//         const result = false;
//         blackSideNoHasCheck.map((emojiBoard) => {
//             const chessboardCheck = ChessBoard.createNewBoard();
//             jest.spyOn(chessboardCheck, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard));
//             it(`Then: there is no check on black side`, () => {
//                 const actual = chessEngine.isCheck(chessboardCheck, Side.Black);
//                 expect(actual).toBe(result);
//             });
//         });
//     });
// });

// const blackSideHasCheck = [
//     [
//         ['♚', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['.', '.', '.', '.', '.', '.', '.', '.'],
//         ['♖', '.', '.', '.', '.', '.', '.', '.'],
//     ],
// ];
// describe(`Given: Chessboard : `, () => {
//     describe(`When: isCheck is invoked on given board`, () => {
//         const result = true;
//         blackSideHasCheck.map((emojiBoard) => {
//             const chessboardCheck = ChessBoard.createNewBoard();
//             jest.spyOn(chessboardCheck, 'board', 'get').mockReturnValue(convertEmojiToRep(emojiBoard));
//             it(`Then: there is check on black side`, () => {
//                 const actual = chessEngine.isCheck(chessboardCheck, Side.Black);
//                 expect(actual).toBe(result);
//             });
//         });
//     });
// });
