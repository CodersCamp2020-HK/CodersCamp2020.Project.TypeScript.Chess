import _ from 'lodash';
import { Cord, PossibleCords } from '../domain/basicChessTypes';

export const getBishopDirections = (cord: Cord): PossibleCords[] => {
    const { x, y } = cord;
    const directions = [
        ..._.zip(_.range(x + 1, 8, 1), _.range(y + 1, 8, 1)),
        ..._.zip(_.range(x + 1, 8, 1), _.range(y - 1, -1, -1)),
        ..._.zip(_.range(x - 1, -1, -1), _.range(y + 1, 8, 1)),
        ..._.zip(_.range(x - 1, -1, -1), _.range(y - 1, -1, -1)),
    ];
    return directions.map((cord) => {
        return { x: cord[0], y: cord[1] };
    });
};
