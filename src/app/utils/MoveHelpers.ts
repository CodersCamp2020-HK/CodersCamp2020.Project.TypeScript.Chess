import { Cord, CordWithMoveType, MoveType, PossibleCords, Side } from '../domain/basicChessTypes';
import _ from 'lodash';
import { IChessBoard } from '../domain/IChessBoard';

export function getKnightDirections(cord: Cord): PossibleCords[] {
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

export function getBishopDirections(cord: Cord): Cord[] {
    const { x, y } = cord;
    const directions = [
        ..._.zip(_.range(x + 1, 8, 1), _.range(y + 1, 8, 1)),
        ..._.zip(_.range(x + 1, 8, 1), _.range(y - 1, -1, -1)),
        ..._.zip(_.range(x - 1, -1, -1), _.range(y + 1, 8, 1)),
        ..._.zip(_.range(x - 1, -1, -1), _.range(y - 1, -1, -1)),
    ];
    const filteredDirections = directions.filter((cord) => cord[0] !== undefined && cord[1] !== undefined);
    return filteredDirections.map((cord) => {
        return { x: cord[0], y: cord[1] } as Cord;
    });
}

export function getKingDirections(cord: Cord): PossibleCords[] {
    const numbers = [-1, 1];
    const possibleMoves = [];

    for (const i of numbers) {
        const actualKingPositionX = cord.x + i;
        const actualKingPositionY = cord.y;
        possibleMoves.push({ x: actualKingPositionX, y: actualKingPositionY });
    }

    for (const i of numbers) {
        const actualKingPositionX = cord.x;
        const actualKingPositionY = cord.y + i;
        possibleMoves.push({ x: actualKingPositionX, y: actualKingPositionY });
    }

    for (const i of numbers) {
        for (const j of numbers) {
            const actualKingPositionX = cord.x + i;
            const actualKingPositionY = cord.y + j;
            possibleMoves.push({ x: actualKingPositionX, y: actualKingPositionY });
        }
    }

    return possibleMoves;
}

export function getRookDirections(cord: Cord): Cord[] {
    const arr: Cord[] = [];
    for (let i = 0; i <= 7; i++) {
        arr.push({ x: cord.x, y: i } as Cord);
    }
    for (let i = 0; i <= 7; i++) {
        arr.push({ x: i, y: cord.y } as Cord);
    }
    const result = _.differenceWith(arr, [cord], _.isEqual);
    return result;
}

const insideBoard = (v: number) => v >= 0 && v <= 7;
export function removeMovesOutsideChessBoard(cords: PossibleCords[]): Cord[] {
    return cords.filter(({ x, y }) => insideBoard(x as number) && insideBoard(y as number)) as Cord[];
}

export function removeMovesBlockedByPiece(
    pieceCord: Cord,
    possibleMovesCords: Cord[],
    boardState: IChessBoard,
): Cord[] {
    const otherPiecesCords = getOtherPiecesCord(possibleMovesCords, boardState);
    const result = excludeMovesBehindPiece(pieceCord, possibleMovesCords, otherPiecesCords);

    return result;
}

export function getOtherPiecesCord(possibleMovesCords: Cord[], boardState: IChessBoard): Cord[] {
    return possibleMovesCords.filter((cord) => {
        const square = boardState.board[cord.x][cord.y];
        return square ? true : false;
    });
}

export function excludeMovesBehindPiece(pieceCord: Cord, possibleMovesCords: Cord[], otherPiecesCords: Cord[]): Cord[] {
    const diffArr: Cord[] = [];

    for (const otherPieceCord of otherPiecesCords) {
        const vector = { x: otherPieceCord.x - pieceCord.x, y: otherPieceCord.y - pieceCord.y };
        let versorX;
        let versorY;
        vector.x === 0 ? (versorX = 0) : vector.x > 0 ? (versorX = 1) : (versorX = -1);
        vector.y === 0 ? (versorY = 0) : vector.y > 0 ? (versorY = 1) : (versorY = -1);
        for (let i = 1; i <= 7; i++) {
            const oneDiffCord = { x: otherPieceCord.x + versorX * i, y: otherPieceCord.y + versorY * i } as Cord;
            if (oneDiffCord.x > 7 || oneDiffCord.x < 0 || oneDiffCord.y > 7 || oneDiffCord.y < 0) break;
            diffArr.push(oneDiffCord);
        }
    }

    return _.differenceWith(possibleMovesCords, diffArr, _.isEqual);
}

export function getMoveTypesForPiece(cords: Cord[], side: Side, boardState: IChessBoard): CordWithMoveType[] {
    const result: CordWithMoveType[] = [];
    for (const move of cords) {
        const { x, y } = move;
        const square = boardState.board[x][y];
        if (square) {
            const otherSide = square.side;
            if (otherSide !== side) {
                result.push({ x, y, moveType: MoveType.Capture });
            }
        } else {
            result.push({ x, y, moveType: MoveType.NormalMove });
        }
    }

    return result;
}
