import {ITime} from './ITime.js';

export interface IInterviewRaw {
    applicant_name: string;
    start_time: ITime;
    duration_time: ITime;
    specialist_id?: number;
}

export interface IInterview extends IInterviewRaw {
    interview_id: number;
}
