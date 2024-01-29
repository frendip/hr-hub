import {ISkill} from './ISkill.js';
import {ITime} from './ITime.js';

export interface ISpecialistRaw {
    full_name: string;
    work_start_time: ITime;
    work_end_time: ITime;
    skills: ISkill[];
}

export interface ISpecialist extends ISpecialistRaw {
    specialist_id: number;
}
