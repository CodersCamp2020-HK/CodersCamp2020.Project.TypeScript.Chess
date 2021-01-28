import { Cord, PossibleCords } from '../domain/basicChessTypes';

export const getKingDirections = (cord: Cord): PossibleCords[] => {
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
};
