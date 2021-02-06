import { Piece, PieceType, Side, Cord } from '../domain/basicChessTypes';
import { ChessBoard } from '../infrastructure/ChessBoard';

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

const knight: Piece = {
    figType: PieceType.Knight,
    cord: { x: 1, y: 0 },
    side: Side.Black,
    isMoved: true,
};

chessboard.board[knight.cord.x][knight.cord.y] = knight;

function getPossibleMovesForKnight(cord: Cord) {
    const possibleMoves = [];
    const possibleCombinations = [
        [1, 2],
        [-1, 2],
        [1, -2],
        [-1, -2],
    ];

    for (const combination of possibleCombinations) {
        possibleMoves.push({ x: cord.x + combination[0], y: cord.y + combination[1] });
        possibleMoves.push({ x: cord.x + combination[1], y: cord.y + combination[0] });
    }

    return possibleMoves;
}

getPossibleMovesForKnight(knight.cord);

//     let possibleCords
//     {
//     [x+1, y+2]
//     [x+2, y+1]
//     [x+2, y-1]
//     [x-1, y+2]

//     [x+1, y-2]
//     [x-2, y+1]
//     [x-2, y-1]
//     [x-1, y-2]
//     }
