import {ITime} from '../types/ITime';

export const convertSecondsToTime = (argSeconds: number): ITime => {
    let remainingSeconds = argSeconds;

    const seconds = remainingSeconds % 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    remainingSeconds = Math.trunc(remainingSeconds / 60);
    const minutes = remainingSeconds % 60;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    remainingSeconds = Math.trunc(remainingSeconds / 60);
    let hours = remainingSeconds;
    const formattedHours = hours < 10 ? '0' + hours : hours;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
