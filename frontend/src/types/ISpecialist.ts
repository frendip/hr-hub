import {ISkill} from './ISkill.js';
import {ITime} from './ITime.js';

export interface ISpecialist {
    specialist_id: number;
    full_name: string;
    work_start_time: ITime;
    work_end_time: ITime;
    skills: ISkill[];
}

export interface ISpecialistCheckboxSkill extends Omit<ISpecialist, 'skills'> {
    skills: Record<number, boolean>[];
}
