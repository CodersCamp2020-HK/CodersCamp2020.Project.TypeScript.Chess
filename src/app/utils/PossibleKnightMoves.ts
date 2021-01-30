import { CordWithMoveType, IChessBoard, Piece, PieceType, Side, Cord } from '../domain/basicChessTypes';
import { ChessBoard } from '../infrastructure/ChessBoard';
import { ChessEngine } from '../infrastructure/ChessEngine';

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
    ],
};

const knight: Piece = {
    figType: PieceType.Knight,
    cord: {x:1, y:0},
    side: Side.Black,
    isMoved: true,    
};

chessboard.board[knight.cord.x][knight.cord.y] = knight;

function getPossibleMovesForKnight(cord: Cord, boardState: IChessBoard){
    const possibleMoves = [];
    const possibleCombinations = [
        [1, 2],
        [-1, 2],
        [1, -2],
        [-1, -2]
    ];

    for (let combination in possibleCombinations) {
        const actualKnightPositionX = knight.cord.x + combination[0];
        const actualKnightPositionY = knight.cord.y + combination[1];

        // if (actualKnightPositionX > 8 || actualKnightPositionX < 0 || actualKnightPositionY > 8 || actualKnightPositionY < 0 ){
        //     break;
        // } 
        possibleMoves.push({x: actualKnightPositionX, y: actualKnightPositionY})
        }

    for (let combination in possibleCombinations){
        const actualKnightPositionX = knight.cord.x + combination[1];
        const actualKnightPositionY = knight.cord.y + combination[0];

        possibleMoves.push({x: actualKnightPositionX, y: actualKnightPositionY})
    }

    getPossibleMovesForKnight(knight.cord, chessboard);
}

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
