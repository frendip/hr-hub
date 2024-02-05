import React, {useState} from 'react';
import {SubmitHandler} from 'react-hook-form';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import SpecialistsList from '../../components/SpecialistsList/SpecialistsList';
import classes from './Specialists.module.scss';
import {CommonButton} from '../../components/UI/Button/Button';
import Popup from '../../components/Popup/Popup';
import SpecialistsForm from '../../components/UI/Form/SpecialistsForm';
import {ISpecialist} from '../../types/ISpecialist';
import {createSpecialist} from '../../store/slices/specialistsSlice';

const Specialists = () => {
    const dispatch = useAppDispatch();
    const [popupActive, setPopupActive] = useState(false);

    const addSpecialistHandler: SubmitHandler<ISpecialist> = (newSpecialist) => {
        dispatch(createSpecialist(newSpecialist));
    };

    return (
        <div className={classes.specialists}>
            <div className={classes.specialists__title}>Специалисты</div>
            <div className={classes.specialists__container}>
                <CommonButton
                    className={classes.specialists__addBtn}
                    size="medium"
                    onClick={() => setPopupActive(true)}
                >
                    Добавить специалиста
                </CommonButton>
                <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                    <SpecialistsForm setPopupActive={setPopupActive} onSubmitHandler={addSpecialistHandler} />
                </Popup>
                <SpecialistsList />
            </div>
        </div>
    );
};

export default Specialists;
