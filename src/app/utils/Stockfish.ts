import { Cord } from '../domain/basicChessTypes';

export const translateToStockfish = (from: Cord, to: Cord): string => {
    const row = new Map([
        [0, 'a'],
        [1, 'b'],
        [2, 'c'],
        [3, 'd'],
        [4, 'e'],
        [5, 'f'],
        [6, 'g'],
        [7, 'h'],
    ]);
    const col = new Map([
        [7, 1],
        [6, 2],
        [5, 3],
        [4, 4],
        [3, 5],
        [2, 6],
        [1, 7],
        [0, 8],
    ]);
    const fromLetter = row.get(from.y);
    const fromNumber = col.get(from.x);
    const toLetter = row.get(to.y);
    const toNumber = col.get(to.x);
    if (fromLetter && fromNumber && toLetter && toNumber) {
        return `${fromLetter}${fromNumber}${toLetter}${toNumber}`;
    }
    return '';
};

export const translateToEngine = (uci: string): { from: Cord; to: Cord } => {
    const row = new Map([
        ['a', 0],
        ['b', 1],
        ['c', 2],
        ['d', 3],
        ['e', 4],
        ['f', 5],
        ['g', 6],
        ['h', 7],
    ]);
    const col = new Map([
        [1, 7],
        [2, 6],
        [3, 5],
        [4, 4],
        [5, 3],
        [6, 2],
        [7, 1],
        [8, 0],
    ]);
    const [fromY, fromX, toY, toX] = uci.split('');
    const fromCordY = row.get(fromY);
    const fromCordX = col.get(parseInt(fromX));
    const toCordY = row.get(toY);
    const toCordX = col.get(parseInt(toX));
    const result: { from: Cord; to: Cord } = {
        from: { x: fromCordX, y: fromCordY } as Cord,
        to: { x: toCordX, y: toCordY } as Cord,
    };
    return result;
};
