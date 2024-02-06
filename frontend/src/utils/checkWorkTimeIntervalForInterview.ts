import {IInterview} from '../types/IInterviews';
import {ISpecialist} from '../types/ISpecialist';
import convertTimeToSeconds from './convertTimeToSeconds';

export const checkWorkTimeIntervalForInterview = (interview: IInterview, specialist: ISpecialist) => {
    const interviewStartTimeInSeconds = convertTimeToSeconds(interview.start_time);
    const interviewEndTimeInSeconds = interviewStartTimeInSeconds + convertTimeToSeconds(interview.duration_time);

    const selectedSpecialistStartTimeInSeconds = convertTimeToSeconds(specialist.work_start_time);
    const selectedSpecialistEndTimeInSeconds = convertTimeToSeconds(specialist.work_end_time);

    return (
        interviewStartTimeInSeconds < selectedSpecialistStartTimeInSeconds ||
        interviewEndTimeInSeconds > selectedSpecialistEndTimeInSeconds
    );
};
