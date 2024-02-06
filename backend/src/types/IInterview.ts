import {ISkill} from './ISkill.js';
import {ITime} from './ITime.js';

export interface IInterviewRaw {
    applicant_name: string;
    start_time: ITime;
    duration_time: ITime;
    skills: ISkill[];
    specialist_id?: number;
    specialist_name?: string;
}

export interface IInterview extends IInterviewRaw {
    interview_id: number;
}
