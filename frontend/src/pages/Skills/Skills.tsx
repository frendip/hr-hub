import React, {useState} from 'react';
import classes from '../pages.module.scss';
import {useAppSelector} from '../../hooks/useAppSelector';
import {CommonButton} from '../../components/UI/Button/Button';
import Popup from '../../components/Popup/Popup';
import SkillsList from '../../components/SkillsList/SkillsList';
import {SubmitHandler} from 'react-hook-form';
import {ISkill} from '../../types/ISkill';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {createSkill} from '../../store/slices/skillsSlice';
import SkillForm from '../../components/UI/Form/SkillForm';

const Skills = () => {
    const dispatch = useAppDispatch();
    const [popupActive, setPopupActive] = useState(false);

    const {status, errorMessage} = useAppSelector((state) => state.skills);

    const addSkillHandler: SubmitHandler<ISkill> = (newSkill) => {
        dispatch(createSkill(newSkill));
    };

    if (status === 'error') {
        return (
            <div className={classes.pages}>
                <div className={classes.pages__title}>Специалисты</div>
                <div className={classes.error}>
                    <h2 className={classes.error__title}>Произошла ошибка.</h2>
                    <div className={classes.error__description}>
                        K сожалению, не удалось получить список специалистов. {errorMessage}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.pages}>
            <div className={classes.pages__title}>Навыки</div>
            <CommonButton className={classes.pages__addBtn} size="medium" onClick={() => setPopupActive(true)}>
                Добавить навык
            </CommonButton>
            <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                {/* <SpecialistsForm setPopupActive={setPopupActive} onSubmitHandler={addSpecialistHandler} /> */}
                <SkillForm setPopupActive={setPopupActive} onSubmitHandler={addSkillHandler} />
            </Popup>
            {status === 'loading' ? <div>Loading</div> : <SkillsList />}
        </div>
    );
};

export default Skills;
