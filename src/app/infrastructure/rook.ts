import { Cord } from '../domain/basicChessTypes';
import _ from 'lodash';

export const getRookDirections = (cord: Cord): Cord[] => {
    const arr: Cord[] = [];
    for (let i = 0; i <= 7; i++) {
        arr.push({ x: cord.x, y: i } as Cord);
    }
    for (let i = 0; i <= 7; i++) {
        arr.push({ x: i, y: cord.y } as Cord);
    }
    const result = _.differenceWith(arr, [cord], _.isEqual);
    return result;
};
