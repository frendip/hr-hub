import {IInterview} from '../types/IInterviews';
import {ISpecialist} from '../types/ISpecialist';
import convertTimeToSeconds from './convertTimeToSeconds';

export const checkSpecialistInterviewsTimeInterval = (
    activeInterview: IInterview,
    activeSpecialist: ISpecialist,
    interviews: IInterview[]
) => {
    const activeSpecialistInterviews = interviews.filter(
        (interview) => interview.specialist_id === activeSpecialist.specialist_id
    );

    const activeInterviewStartTimeInSeconds = convertTimeToSeconds(activeInterview.start_time);
    const activeInterviewEndTimeInSeconds =
        activeInterviewStartTimeInSeconds + convertTimeToSeconds(activeInterview.duration_time);

    return activeSpecialistInterviews.some((interview) => {
        const interviewStartTimeInSeconds = convertTimeToSeconds(interview.start_time);
        const interviewEndTimeInSeconds = interviewStartTimeInSeconds + convertTimeToSeconds(interview.duration_time);

        return (
            activeInterviewStartTimeInSeconds <= interviewEndTimeInSeconds &&
            activeInterviewEndTimeInSeconds >= interviewStartTimeInSeconds
        );
    });
};
