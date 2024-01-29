import {useEffect} from 'react';
import SpecialistItem from '../SpecialistItem/SpecialistItem';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {fetchSpecialists} from '../../store/slices/specialistsSlice';
import {useAppSelector} from '../../hooks/useAppSelector';
import classes from './SpecialistsList.module.scss';

const SpecialistsList = () => {
    const dispatch = useAppDispatch();
    const {specialists, status, errorMessage} = useAppSelector((state) => state.specialists);
    useEffect(() => {
        dispatch(fetchSpecialists());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className={classes.title}>Специалисты</div>
            {status === 'error' ? (
                <div className={classes.error}>
                    <h2 className={classes.error__title}>Произошла ошибка.</h2>
                    <div className={classes.error__description}>
                        K сожалению, не удалось получить список специалистов. {errorMessage}
                    </div>
                </div>
            ) : (
                <div className={classes.items}>
                    {status === 'loading' ? (
                        <div>Loading</div>
                    ) : (
                        specialists.map((specialist) => (
                            <SpecialistItem key={specialist.specialist_id} specialist={specialist} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default SpecialistsList;
