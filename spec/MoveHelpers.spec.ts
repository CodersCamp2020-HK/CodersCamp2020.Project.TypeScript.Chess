// import {
//     getBishopDirections,
//     getRookDirections,
//     getKingDirections,
//     removeMovesOutsideChessBoard,
//     getOtherPiecesCord,
//     excludeMovesBehindPiece,
//     getMoveTypesForPiece,
// } from '../src/app/utils/MoveHelpers';
// import { displayChessboard, displayMoves } from './Display';
// import { ChessBoard } from '../src/app/infrastructure/ChessBoard';
// import { Cord, Piece, PieceType, PossibleCords, Side } from '../src/app/domain/basicChessTypes';

// const testCordDirections: Cord = { x: 3, y: 3 };
// describe(`Given: Cords ${testCordDirections}`, () => {
//     describe(`When: getBishopDirections( cord = ${JSON.stringify(testCordDirections)}) is invoked`, () => {
//         const expected: Cord[] = [
//             { x: 4, y: 4 },
//             { x: 5, y: 5 },
//             { x: 6, y: 6 },
//             { x: 7, y: 7 },
//             { x: 4, y: 2 },
//             { x: 5, y: 1 },
//             { x: 6, y: 0 },
//             { x: 2, y: 4 },
//             { x: 1, y: 5 },
//             { x: 0, y: 6 },
//             { x: 2, y: 2 },
//             { x: 1, y: 1 },
//             { x: 0, y: 0 },
//         ];
//         it('Then: possible moves should be: ', () => {
//             const actual = getBishopDirections(testCordDirections);
//             expect(actual).toMatchObject(expected);
//         });
//     });
//     describe(`When: getKingDirections( cord = ${JSON.stringify(testCordDirections)}) is invoked`, () => {
//         const expected: Cord[] = [
//             { x: 2, y: 3 },
//             { x: 4, y: 3 },
//             { x: 3, y: 2 },
//             { x: 3, y: 4 },
//             { x: 2, y: 2 },
//             { x: 2, y: 4 },
//             { x: 4, y: 2 },
//             { x: 4, y: 4 },
//         ];
//         it('Then: possible moves should be: ', () => {
//             const actual = getKingDirections(testCordDirections);
//             expect(actual).toMatchObject(expected);
//         });
//     });
//     describe(`When: getRookDirections( cord = ${JSON.stringify(testCordDirections)}) is invoked`, () => {
//         const expected: Cord[] = [
//             { x: 3, y: 0 },
//             { x: 3, y: 1 },
//             { x: 3, y: 2 },
//             { x: 3, y: 4 },
//             { x: 3, y: 5 },
//             { x: 3, y: 6 },
//             { x: 3, y: 7 },
//             { x: 0, y: 3 },
//             { x: 1, y: 3 },
//             { x: 2, y: 3 },
//             { x: 4, y: 3 },
//             { x: 5, y: 3 },
//             { x: 6, y: 3 },
//             { x: 7, y: 3 },
//         ];
//         it('Then: possible moves should be: ', () => {
//             const actual = getRookDirections(testCordDirections);
//             expect(actual).toMatchObject(expected);
//         });
//     });
// });

// const testCordsOutsideBoard: PossibleCords[] = [
//     { x: -5, y: -2 },
//     { x: 0, y: -2 },
//     { x: 1, y: 1 },
//     { x: 2, y: 3 },
//     { x: 4, y: 0 },
//     { x: -2, y: 0 },
//     { x: 0, y: 0 },
//     { x: -52321312, y: 1902 },
//     { x: 2, y: -2213232131 },
//     { x: 2, y: 2213232131 },
//     { x: 89348934839483, y: 5 },
// ];
// describe(`Given: List of cords: ${displayMoves(testCordsOutsideBoard)}`, () => {
//     describe(`When: removeMovesOutsideChessBoard is invoked with that list of cords`, () => {
//         const expected: Cord[] = [
//             { x: 1, y: 1 },
//             { x: 2, y: 3 },
//             { x: 4, y: 0 },
//             { x: 0, y: 0 },
//         ];
//         it(`Then: list of cords should be ${displayMoves(expected)}`, () => {
//             const actual = removeMovesOutsideChessBoard(testCordsOutsideBoard);
//             expect(actual).toMatchObject(expected);
//         });
//     });
// });

// const chessboard = new ChessBoard();
// chessboard.board = [
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
//     [null, null, null, null, null, null, null, null],
// ];
// const rook: Piece = {
//     figType: PieceType.Rook,
//     cord: { x: 3, y: 3 },
//     side: Side.White,
//     isMoved: true,
// };
// const pawn1: Piece = {
//     figType: PieceType.Pawn,
//     cord: { x: 2, y: 3 },
//     side: Side.White,
//     isMoved: true,
// };
// const pawn2: Piece = {
//     figType: PieceType.Pawn,
//     cord: { x: 4, y: 3 },
//     side: Side.White,
//     isMoved: true,
// };
// const pawn3: Piece = {
//     figType: PieceType.Pawn,
//     cord: { x: 3, y: 2 },
//     side: Side.White,
//     isMoved: true,
// };
// const pawn4: Piece = {
//     figType: PieceType.Pawn,
//     cord: { x: 3, y: 4 },
//     side: Side.White,
//     isMoved: true,
// };
// const pawn5: Piece = {
//     figType: PieceType.Pawn,
//     cord: { x: 3, y: 5 },
//     side: Side.White,
//     isMoved: true,
// };
// const pawn6: Piece = {
//     figType: PieceType.Pawn,
//     cord: { x: 3, y: 6 },
//     side: Side.White,
//     isMoved: true,
// };
// chessboard.board[rook.cord.x][rook.cord.y] = rook;
// chessboard.board[pawn1.cord.x][pawn1.cord.y] = pawn1;
// chessboard.board[pawn2.cord.x][pawn2.cord.y] = pawn2;
// chessboard.board[pawn3.cord.x][pawn3.cord.y] = pawn3;
// chessboard.board[pawn4.cord.x][pawn4.cord.y] = pawn4;
// chessboard.board[pawn5.cord.x][pawn5.cord.y] = pawn5;
// chessboard.board[pawn6.cord.x][pawn6.cord.y] = pawn6;
// describe(`Given: chessboard: ${displayChessboard(chessboard.board)}`, () => {
//     describe('When: getOtherPiecesCord is invoked for rook', () => {
//         const expected: Cord[] = [
//             { x: 3, y: 2 },
//             { x: 3, y: 4 },
//             { x: 3, y: 5 },
//             { x: 3, y: 6 },
//             { x: 2, y: 3 },
//             { x: 4, y: 3 },
//         ];
//         it(`Then: other pieces cord should be: ${displayMoves(expected)}`, () => {
//             const possibleMoves: Cord[] = [
//                 { x: 3, y: 0 },
//                 { x: 3, y: 1 },
//                 { x: 3, y: 2 },
//                 { x: 3, y: 4 },
//                 { x: 3, y: 5 },
//                 { x: 3, y: 6 },
//                 { x: 3, y: 7 },
//                 { x: 0, y: 3 },
//                 { x: 1, y: 3 },
//                 { x: 2, y: 3 },
//                 { x: 4, y: 3 },
//                 { x: 5, y: 3 },
//                 { x: 6, y: 3 },
//                 { x: 7, y: 3 },
//             ];
//             const actual = getOtherPiecesCord(possibleMoves, chessboard);
//             expect(actual).toMatchObject(expected);
//         });
//     });
//     describe('When: excludeMovesBehindPiece is invoked for rook', () => {
//         const expected: Cord[] = [
//             { x: 3, y: 2 },
//             { x: 3, y: 4 },
//             { x: 2, y: 3 },
//             { x: 4, y: 3 },
//         ];
//         it('Then: possible moves should be an empty array', () => {
//             const possibleMoves = getRookDirections(rook.cord);
//             const otherPiecesCords: Cord[] = [
//                 { x: 3, y: 2 },
//                 { x: 3, y: 4 },
//                 { x: 3, y: 5 },
//                 { x: 3, y: 6 },
//                 { x: 2, y: 3 },
//                 { x: 4, y: 3 },
//             ];
//             const actual = excludeMovesBehindPiece(rook.cord, possibleMoves, otherPiecesCords);
//             expect(actual).toMatchObject(expected);
//         });
//     });
//     describe('When: getMoveTypesForPiece is invoked for rook', () => {
//         it('Then: moves should return an empty array', () => {
//             const cords: Cord[] = [
//                 { x: 3, y: 2 },
//                 { x: 3, y: 4 },
//                 { x: 2, y: 3 },
//                 { x: 4, y: 3 },
//             ];
//             const result = getMoveTypesForPiece(cords, rook.side, chessboard);
//             expect(result).toMatchObject([]);
//         });
//     });
// });
