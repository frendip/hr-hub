import React, {useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import classes from '../pages.module.scss';
import {CommonButton} from '../../components/UI/Button/Button';
import Popup from '../../components/Popup/Popup';
import {IInterview} from '../../types/IInterviews';
import {createInterview} from '../../store/slices/interviewsSlice';
import InterviewsList from '../../components/InterviewsList/InterviewsList';
import InterviewForm from '../../components/UI/Form/InterviewForm';

const Interviews = () => {
    const dispatch = useAppDispatch();
    const [popupActive, setPopupActive] = useState(false);

    const {status, errorMessage} = useAppSelector((state) => state.interviews);

    const addInterviewsHandler: SubmitHandler<IInterview> = (newInterview) => {
        dispatch(createInterview(newInterview));
    };

    if (status === 'error') {
        return (
            <div className={classes.pages}>
                <div className={classes.pages__title}>Специалисты</div>
                <div className={classes.error}>
                    <h2 className={classes.error__title}>Произошла ошибка.</h2>
                    <div className={classes.error__description}>
                        K сожалению, не удалось получить список интервью. {errorMessage}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.pages}>
            <div className={classes.pages__title}>Интервью</div>
            <CommonButton className={classes.pages__addBtn} size="medium" onClick={() => setPopupActive(true)}>
                Добавить интервью
            </CommonButton>
            <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                <InterviewForm setPopupActive={setPopupActive} onSubmitHandler={addInterviewsHandler} />
            </Popup>
            {status === 'loading' ? <div>Loading</div> : <InterviewsList />}
        </div>
    );
};

export default Interviews;
