import {ITime} from '../types/ITime.js';

export default function convertTimeToSeconds(time: ITime) {
    return time
        .split(':')
        .map((a) => +a)
        .reduce((acc, cur, index) => {
            if (index === 0) {
                acc += cur * 60 * 60;
            } else if (index === 1) {
                acc += cur * 60;
            } else {
                acc += cur;
            }

            return acc;
        }, 0);
}
