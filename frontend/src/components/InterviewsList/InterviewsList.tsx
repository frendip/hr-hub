import {FC, HTMLAttributes} from 'react';
import {useAppSelector} from '../../hooks/useAppSelector';
import classes from './InterviewsList.module.scss';
import clsx from 'clsx';
import InterviewItem from '../InterviewItem/InterviewItem';

interface InterviewsListProps extends HTMLAttributes<HTMLDivElement> {}

const InterviewsList: FC<InterviewsListProps> = ({className}) => {
    const {interviews} = useAppSelector((state) => state.interviews);

    return (
        <div className={clsx(className, classes.interviewsList)}>
            <InterviewsTitle />
            {interviews.map((interview) => (
                <InterviewItem key={interview.interview_id} interview={interview} />
            ))}
        </div>
    );
};

const InterviewsTitle = () => {
    return (
        <>
            <div className={classes.interviewsList__title}>ФИО кандидата</div>
            <div className={classes.interviewsList__title}>Время начала собеседования</div>
            <div className={classes.interviewsList__title}>Продолжительность собеседования</div>
            <div className={classes.interviewsList__title}>Необходимые навыки</div>
            <div className={classes.interviewsList__title}>Специалист</div>
            <div></div>
        </>
    );
};

export default InterviewsList;
