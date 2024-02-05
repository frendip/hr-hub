import {FC, useEffect, HTMLAttributes} from 'react';
import SpecialistItem from '../SpecialistItem/SpecialistItem';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {fetchSpecialists} from '../../store/slices/specialistsSlice';
import {useAppSelector} from '../../hooks/useAppSelector';
import classes from './SpecialistsList.module.scss';
import {fetchSkills} from '../../store/slices/skillsSlice';
import clsx from 'clsx';

interface SpecialistsListProps extends HTMLAttributes<HTMLDivElement> {}

const SpecialistsList: FC<SpecialistsListProps> = ({className}) => {
    const dispatch = useAppDispatch();
    const {specialists, status, errorMessage} = useAppSelector((state) => state.specialists);

    useEffect(() => {
        dispatch(fetchSpecialists());
        dispatch(fetchSkills());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {status === 'error' ? (
                <div className={classes.error}>
                    <h2 className={classes.error__title}>Произошла ошибка.</h2>
                    <div className={classes.error__description}>
                        K сожалению, не удалось получить список специалистов. {errorMessage}
                    </div>
                </div>
            ) : (
                <div className={clsx(className, classes.specialistList)}>
                    <SpecialistsTitle />
                    {status === 'loading' ? (
                        <div>Loading</div>
                    ) : (
                        specialists.map((specialist) => (
                            <SpecialistItem key={specialist.specialist_id} specialist={specialist} />
                        ))
                    )}
                </div>
            )}
        </>
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
