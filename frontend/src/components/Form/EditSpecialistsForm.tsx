import React, {FC, Dispatch, SetStateAction, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import classes from './Form.module.scss';
import {ISpecialist, ISpecialistCheckboxSkill} from '../../types/ISpecialist';
import {useAppSelector} from '../../hooks/useAppSelector';
import clsx from 'clsx';

interface EditSpecialistsFormProps {
    setPopupActive: Dispatch<SetStateAction<boolean>>;
    specialist: ISpecialist;
    onSubmitHandler: SubmitHandler<ISpecialist>;
}

const EditSpecialistsForm: FC<EditSpecialistsFormProps> = ({setPopupActive, specialist, onSubmitHandler}) => {
    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue
    } = useForm<ISpecialistCheckboxSkill>({
        mode: 'onChange',
        defaultValues: {
            specialist_id: specialist.specialist_id,
            full_name: specialist.full_name,
            work_start_time: specialist.work_start_time,
            work_end_time: specialist.work_end_time
        }
    });

    const {skills} = useAppSelector((state) => state.skills);

    useEffect(() => {
        specialist.skills.forEach((skill) => {
            setValue(`skills.${skill.skill_id}`, {[skill.skill_id]: true});
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (data: ISpecialistCheckboxSkill) => {
        const checkedSkills = skills.filter((skill) => data.skills[skill.skill_id]);
        const result = {...data, skills: checkedSkills} as ISpecialist;
        setPopupActive(false);
        onSubmitHandler(result);
    };

    return (
        <div className={classes.card}>
            <h2 className={classes.card__title}>Редактирование информации о сотруднике</h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <label className={classes.form__label}>
                    <div className={classes.form__labelTitle}>ФИО</div>
                    <input
                        className={classes.form__input}
                        {...register('full_name', {
                            required: 'Введите ФИО сотрудника.',
                            minLength: {
                                value: 7,
                                message: 'ФИО должны содержать минимум 7 символа'
                            }
                        })}
                    />
                    {errors?.full_name && <div className={classes.form__error}>{errors.full_name.message}</div>}
                </label>
                <label className={classes.form__label}>
                    <div className={classes.form__labelTitle}>Время начала работы</div>
                    <input
                        className={classes.form__input}
                        {...register('work_start_time', {
                            required: 'Введите время начала работы',
                            pattern: {
                                value: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
                                message: 'Время должно быть в формате: HH:MM:SS'
                            }
                        })}
                    />
                    {errors?.work_start_time && (
                        <div className={classes.form__error}>{errors.work_start_time.message}</div>
                    )}
                </label>
                <label className={classes.form__label}>
                    <div className={classes.form__labelTitle}>Время конца работы</div>
                    <input
                        className={classes.form__input}
                        {...register('work_end_time', {
                            required: 'Введите время конца работы',
                            pattern: {
                                value: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
                                message: 'Время должно быть в формате: HH:MM:SS'
                            }
                        })}
                    />
                    {errors?.work_end_time && <div className={classes.form__error}>{errors.work_end_time.message}</div>}
                </label>
                <label className={classes.form__label}>
                    <div className={classes.form__labelTitle}>Навыки</div>
                    <div className={clsx(classes.form__checkboxes, classes.checkboxes)}>
                        {skills.map((skill) => (
                            <div key={skill.skill_id} className={classes.checkboxes__item}>
                                <input type="checkbox" {...register(`skills.${skill.skill_id}`)} />
                                <div className={classes.checkboxes__title}>{skill.skill_name}</div>
                            </div>
                        ))}
                    </div>
                </label>
                <div className={classes.form__submit}>
                    <button className={classes.form__button}>Изменить</button>
                </div>
            </form>
        </div>
    );
};

export default EditSpecialistsForm;
