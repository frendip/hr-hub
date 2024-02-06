import React, {useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import SpecialistsList from '../../components/SpecialistsList/SpecialistsList';
import classes from '../pages.module.scss';
import {CommonButton} from '../../components/UI/Button/Button';
import Popup from '../../components/Popup/Popup';
import SpecialistsForm from '../../components/UI/Form/SpecialistsForm';
import {ISpecialist} from '../../types/ISpecialist';
import {createSpecialist} from '../../store/slices/specialistsSlice';

const Specialists = () => {
    const dispatch = useAppDispatch();
    const [popupActive, setPopupActive] = useState(false);

    const {status, errorMessage} = useAppSelector((state) => state.specialists);

    const addSpecialistHandler: SubmitHandler<ISpecialist> = (newSpecialist) => {
        dispatch(createSpecialist(newSpecialist));
    };

    if (status === 'error') {
        return (
            <div className={classes.pages}>
                <div className={classes.pages__title}>Специалисты</div>
                <div className={classes.error}>
                    <h2 className={classes.error__title}>Произошла ошибка.</h2>
                    <div className={classes.error__description}>
                        K сожалению, не удалось получить список навыков. {errorMessage}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.pages}>
            <div className={classes.pages__title}>Специалисты</div>
            <CommonButton className={classes.pages__addBtn} size="medium" onClick={() => setPopupActive(true)}>
                Добавить специалиста
            </CommonButton>
            <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                <SpecialistsForm setPopupActive={setPopupActive} onSubmitHandler={addSpecialistHandler} />
            </Popup>
            {status === 'loading' ? <div>Loading</div> : <SpecialistsList />}
        </div>
    );
};

export default Specialists;
