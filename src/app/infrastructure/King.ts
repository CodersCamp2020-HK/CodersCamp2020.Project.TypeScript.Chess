import { IChessBoard, Piece, PieceType, Side, Cord } from '../domain/basicChessTypes';

const aaa: IChessBoard = {
    board: [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ],
};
const king: Piece = {
    figType: PieceType.King,
    cord: {
        x: 0,
        y: 0,
    },
    side: Side.White,
    isMoved: true,
};
aaa.board[king.cord.x][king.cord.y] = king;
console.log(aaa);

function getPossibleMovesForKing(cord: Cord, boardState: IChessBoard) {
    // return [];
    const numbers = [-1, 1];
    const possibleMoves = [];
    // góra dół
    for (const i of numbers) {
        const actualKingPositionX = king.cord.x + i;
        const actualKingPositionY = king.cord.y;
        possibleMoves.push({ x: actualKingPositionX, y: actualKingPositionY });
    }
    // lewo prawo
    console.log('lewo prawo');
    for (const i of numbers) {
        const actualKingPositionX = king.cord.x;
        const actualKingPositionY = king.cord.y + i;
        possibleMoves.push({ x: actualKingPositionX, y: actualKingPositionY });
    }
    for (const i of numbers) {
        for (const j of numbers) {
            const actualKingPositionX = king.cord.x + i;
            const actualKingPositionY = king.cord.y + j;
            possibleMoves.push({ x: actualKingPositionX, y: actualKingPositionY });
        }
    }
    console.log(possibleMoves);
}

getPossibleMovesForKing(king.cord, aaa);
