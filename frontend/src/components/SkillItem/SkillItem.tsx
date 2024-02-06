import {FC, useState} from 'react';
import classes from './SkillItem.module.scss';
import {clsx} from 'clsx';
import Popup from '../Popup/Popup';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import deleteIcon from '../../assets/img/deleteIcon.svg';
import editIcon from '../../assets/img/editIcon.svg';
import {ISkill} from '../../types/ISkill';
import SkillForm from '../UI/Form/SkillForm';
import {SubmitHandler} from 'react-hook-form';
import {deleteSkill, updateSkill} from '../../store/slices/skillsSlice';

interface SkillItemProps {
    skill: ISkill;
}

const SkillItem: FC<SkillItemProps> = ({skill}) => {
    const dispatch = useAppDispatch();
    const [popupActive, setPopupActive] = useState(false);

    const updateSkillHandler: SubmitHandler<ISkill> = (updatedSkill) => {
        dispatch(updateSkill(updatedSkill));
    };

    const deleteSkillHandler = () => {
        if (window.confirm('Вы действительно хотите удалить навык?')) {
            dispatch(deleteSkill(skill.skill_id));
        }
    };

    return (
        <>
            <div className={clsx(classes.skillItem, classes.skillName)}>{skill.skill_name}</div>
            <div className={clsx(classes.skillItem, classes.modify)}>
                <div className={classes.modify__icon} onClick={() => setPopupActive(true)}>
                    <img src={editIcon} alt="edit" />
                </div>
                <div className={classes.modify__icon} onClick={deleteSkillHandler}>
                    <img src={deleteIcon} alt="delete" />
                </div>
            </div>
            <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                <SkillForm setPopupActive={setPopupActive} onSubmitHandler={updateSkillHandler} skill={skill} />
            </Popup>
        </>
    );
};

export default SkillItem;
