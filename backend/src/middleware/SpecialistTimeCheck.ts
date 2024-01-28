import type {Request, Response, NextFunction} from 'express';
import {ISpecialist, ISpecialistRaw} from '../types/ISpecialist.js';
import {ITime} from '../types/ITime.js';
import convertTimeToSeconds from '../utils/convertTimeToSeconds.js';

function timeFormatValidation(time: ITime) {
    const [hours, minutes, seconds] = time.split(':').map((a) => +a);

    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59;
}

function timeRangeValidation(timeStart: ITime, timeEnd: ITime) {
    const sumStart = convertTimeToSeconds(timeStart);
    const sumEnd = convertTimeToSeconds(timeEnd);

    return sumEnd - sumStart > 0 ? true : false;
}

export default function specialistTimeCheck(req: Request, res: Response, next: NextFunction) {
    try {
        const {work_start_time, work_end_time} = req.body as ISpecialist | ISpecialistRaw;

        if (!timeFormatValidation(work_start_time) || !timeFormatValidation(work_end_time)) {
            return res.status(400).json({message: 'Invalid time format'});
        }

        if (!timeRangeValidation(work_start_time, work_end_time)) {
            return res.status(400).json({message: 'Invalid time range'});
        }

        next();
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error'});
    }
}
