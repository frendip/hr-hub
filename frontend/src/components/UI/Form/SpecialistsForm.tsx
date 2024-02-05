import React, {FC, Dispatch, SetStateAction, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import classes from './Form.module.scss';
import {ISpecialist, ISpecialistCheckboxSkill} from '../../../types/ISpecialist';
import {useAppSelector} from '../../../hooks/useAppSelector';
import clsx from 'clsx';
import {CommonButton} from '../Button/Button';

interface SpecialistsFormProps {
    setPopupActive: Dispatch<SetStateAction<boolean>>;
    onSubmitHandler: SubmitHandler<ISpecialist>;
    specialist?: ISpecialist;
}

const SpecialistsForm: FC<SpecialistsFormProps> = ({setPopupActive, onSubmitHandler, specialist}) => {
    const defaultValues = specialist
        ? {
              specialist_id: specialist.specialist_id,
              full_name: specialist.full_name,
              work_start_time: specialist.work_start_time,
              work_end_time: specialist.work_end_time
          }
        : {};

    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue
    } = useForm<ISpecialistCheckboxSkill>({
        mode: 'onChange',
        defaultValues
    });

    const {skills} = useAppSelector((state) => state.skills);

    useEffect(() => {
        if (specialist) {
            specialist.skills.forEach((skill) => {
                setValue(`skills.${skill.skill_id}`, {[skill.skill_id]: true});
            });
        }
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
            <h2 className={classes.card__title}>
                {specialist ? 'Редактирование информации о сотрудник' : 'Добавление сотрудника'}
            </h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>ФИО</div>
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
                </div>
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>Время начала работы</div>
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
                </div>
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>Время конца работы</div>
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
                </div>
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>Навыки</div>
                    <div className={clsx(classes.form__checkboxes, classes.checkboxes)}>
                        <div className={classes.checkboxes__container}>
                            {skills.map((skill) => (
                                <label key={skill.skill_id} className={classes.checkboxes__item}>
                                    <input type="checkbox" {...register(`skills.${skill.skill_id}`)} />
                                    <div className={classes.checkboxes__title}>{skill.skill_name}</div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={classes.form__submit}>
                    <CommonButton variant="secondary">{specialist ? 'Изменить' : 'Добавить'}</CommonButton>
                </div>
            </form>
        </div>
    );
};

export default SpecialistsForm;
