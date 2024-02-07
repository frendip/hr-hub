import {FC, useState} from 'react';
import classes from './InterviewItem.module.scss';
import {clsx} from 'clsx';
import {SubmitHandler} from 'react-hook-form';
import Popup from '../Popup/Popup';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import deleteIcon from '../../assets/img/deleteIcon.svg';
import editIcon from '../../assets/img/editIcon.svg';
import {IInterview} from '../../types/IInterviews';
import {deleteInterview, updateInterview} from '../../store/slices/interviewsSlice';
import InterviewForm from '../UI/Form/InterviewForm';

interface InterviewItemProps {
    interview: IInterview;
}

const InterviewItem: FC<InterviewItemProps> = ({interview}) => {
    const dispatch = useAppDispatch();
    const [popupActive, setPopupActive] = useState(false);

    const updateInterviewHandler: SubmitHandler<IInterview> = (updatedInterview) => {
        dispatch(updateInterview(updatedInterview));
    };

    const deleteSpecialistHandler = () => {
        if (window.confirm('Вы действительно хотите удалить собеседование?')) {
            dispatch(deleteInterview(interview.interview_id));
        }
    };

    return (
        <>
            <div className={clsx(classes.interviewItem, classes.fullName)}>{interview.applicant_name}</div>
            <div className={classes.interviewItem}>{interview.start_time}</div>
            <div className={classes.interviewItem}>{interview.duration_time}</div>
            <div className={clsx(classes.interviewItem, classes.skills)}>
                {interview.skills.map((skill) => skill.skill_name).join(', ')}
            </div>
            <div className={clsx(classes.interviewItem, classes.fullName)}>{interview.specialist_name}</div>
            <div className={clsx(classes.interviewItem, classes.modify)}>
                <div className={classes.modify__icon} onClick={() => setPopupActive(true)}>
                    <img src={editIcon} alt="edit" />
                </div>
                <div className={classes.modify__icon} onClick={deleteSpecialistHandler}>
                    <img src={deleteIcon} alt="delete" />
                </div>
            </div>
            <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                <InterviewForm
                    setPopupActive={setPopupActive}
                    onSubmitHandler={updateInterviewHandler}
                    interview={interview}
                />
            </Popup>
        </>
    );
};

export default InterviewItem;
