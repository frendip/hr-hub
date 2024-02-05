import {FC, useState} from 'react';
import {ISpecialist} from '../../types/ISpecialist';
import classes from './SpecialistItem.module.scss';
import {clsx} from 'clsx';
import {SubmitHandler} from 'react-hook-form';
import Popup from '../Popup/Popup';
import SpecialistsForm from '../UI/Form/SpecialistsForm';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {deleteSpecialist, updateSpecialist} from '../../store/slices/specialistsSlice';
import deleteIcon from '../../assets/img/deleteIcon.svg';
import editIcon from '../../assets/img/editIcon.svg';

interface SpecialistItemProps {
    specialist: ISpecialist;
}

const SpecialistItem: FC<SpecialistItemProps> = ({specialist}) => {
    const dispatch = useAppDispatch();
    const [popupActive, setPopupActive] = useState(false);

    const updateSpecialistHandler: SubmitHandler<ISpecialist> = (updatedSpecialist) => {
        dispatch(updateSpecialist(updatedSpecialist));
    };

    const deleteSpecialistHandler = () => {
        if (window.confirm('Вы действительно хотите удалить сотрудника?')) {
            dispatch(deleteSpecialist(specialist.specialist_id));
        }
    };

    return (
        <>
            <div className={clsx(classes.specialistItem, classes.fullName)}>{specialist.full_name}</div>
            <div className={classes.specialistItem}>{specialist.work_start_time}</div>
            <div className={classes.specialistItem}>{specialist.work_end_time}</div>
            <div className={clsx(classes.specialistItem, classes.skills)}>
                {specialist.skills.map((skill) => skill.skill_name).join(', ')}
            </div>
            <div className={clsx(classes.specialistItem, classes.modify)}>
                <div className={classes.modify__icon} onClick={() => setPopupActive(true)}>
                    <img src={editIcon} alt="edit" />
                </div>
                <div className={classes.modify__icon} onClick={deleteSpecialistHandler}>
                    <img src={deleteIcon} alt="delete" />
                </div>
            </div>
            <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                <SpecialistsForm
                    setPopupActive={setPopupActive}
                    onSubmitHandler={updateSpecialistHandler}
                    specialist={specialist}
                />
            </Popup>
        </>
    );
};

export default SpecialistItem;
