import {ISkill} from './ISkill.js';
import {ITime} from './ITime.js';

export interface IInterview {
    interview_id: number;
    applicant_name: string;
    start_time: ITime;
    duration_time: ITime;
    skills: ISkill[];
    specialist_id?: number;
}
