import {ISkill} from './ISkill.js';
import {ITime} from './ITime.js';

export interface IInterview {
    interview_id: number;
    applicant_name: string;
    start_time: ITime;
    duration_time: ITime;
    skills: ISkill[];
    specialist_id?: number;
    specialist_name?: string;
}

export interface IInterviewCheckboxSkill extends Omit<IInterview, 'skills'> {
    skills: Record<number, boolean>[];
}
