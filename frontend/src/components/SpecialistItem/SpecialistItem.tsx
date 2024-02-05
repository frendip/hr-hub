import {FC, useState} from 'react';
import {ISpecialist} from '../../types/ISpecialist';
import classes from './SpecialistItem.module.scss';
import {clsx} from 'clsx';
import {SubmitHandler} from 'react-hook-form';
import Popup from '../Popup/Popup';
import EditSpecialistsForm from '../Form/EditSpecialistsForm';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {updateSpecialist} from '../../store/slices/specialistsSlice';

interface SpecialistItemProps {
    specialist: ISpecialist;
}

const SpecialistItem: FC<SpecialistItemProps> = ({specialist}) => {
    const dispatch = useAppDispatch();

    const test: SubmitHandler<ISpecialist> = (updatedSpecialist) => {
        dispatch(updateSpecialist(updatedSpecialist));
    };

    const [popupActive, setPopupActive] = useState(false);

    return (
        <>
            <div className={clsx(classes.specialistItem, classes.fullName)}>{specialist.full_name}</div>
            <div className={classes.specialistItem}>{specialist.work_start_time}</div>
            <div className={classes.specialistItem}>{specialist.work_end_time}</div>
            <div className={clsx(classes.specialistItem, classes.skills)}>
                {specialist.skills.map((skill) => skill.skill_name).join(', ')}
            </div>
            <div className={classes.specialistItem} onClick={() => setPopupActive(true)}>
                edit
            </div>
            <Popup popupActive={popupActive} setPopupActive={setPopupActive}>
                <EditSpecialistsForm setPopupActive={setPopupActive} specialist={specialist} onSubmitHandler={test} />
            </Popup>
        </>
    );
};

export default SpecialistItem;
