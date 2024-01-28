import {ITime} from './ITime.js';

export interface ISpecialistRaw {
    full_name: string;
    work_start_time: ITime;
    work_end_time: ITime;
}

export interface ISpecialist extends ISpecialistRaw {
    specialist_id: number;
}
