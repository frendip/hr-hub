import {FC} from 'react';
import {ISpecialist} from '../../types/ISpecialist';
import classes from './SpecialistItem.module.scss';
import {clsx} from 'clsx';

interface SpecialistItemProps {
    specialist: ISpecialist;
}

const SpecialistItem: FC<SpecialistItemProps> = ({specialist}) => {
    return (
        <>
            <div className={clsx(classes.specialistItem, classes.fullName)}>{specialist.full_name}</div>
            <div className={classes.specialistItem}>{specialist.work_start_time}</div>
            <div className={classes.specialistItem}>{specialist.work_end_time}</div>
            <div className={clsx(classes.specialistItem, classes.skills)}>
                {specialist.skills.map((skill) => skill.skill_name).join(', ')}
            </div>
            <div className={classes.specialistItem}>edit</div>
        </>
    );
};

export default SpecialistItem;
