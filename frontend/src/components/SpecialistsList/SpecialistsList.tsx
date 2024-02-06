import {FC, HTMLAttributes} from 'react';
import SpecialistItem from '../SpecialistItem/SpecialistItem';
import {useAppSelector} from '../../hooks/useAppSelector';
import classes from './SpecialistsList.module.scss';
import clsx from 'clsx';

interface SpecialistsListProps extends HTMLAttributes<HTMLDivElement> {}

const SpecialistsList: FC<SpecialistsListProps> = ({className}) => {
    const {specialists} = useAppSelector((state) => state.specialists);

    return (
        <div className={clsx(className, classes.specialistList)}>
            <SpecialistsTitle />
            {specialists.map((specialist) => (
                <SpecialistItem key={specialist.specialist_id} specialist={specialist} />
            ))}
        </div>
    );
};

const SpecialistsTitle = () => {
    return (
        <>
            <div className={classes.specialistList__title}>ФИО</div>
            <div className={classes.specialistList__title}>Время начала работы</div>
            <div className={classes.specialistList__title}>Время конца работы</div>
            <div className={classes.specialistList__title}>Навыки</div>
            <div></div>
        </>
    );
};

export default SpecialistsList;
