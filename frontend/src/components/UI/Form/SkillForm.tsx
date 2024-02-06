import React, {FC, Dispatch, SetStateAction} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import classes from './Form.module.scss';
import {CommonButton} from '../Button/Button';
import {ISkill} from '../../../types/ISkill';

interface SkillFormProps {
    setPopupActive: Dispatch<SetStateAction<boolean>>;
    onSubmitHandler: SubmitHandler<ISkill>;
    skill?: ISkill;
}

const SkillForm: FC<SkillFormProps> = ({setPopupActive, onSubmitHandler, skill}) => {
    const defaultValues = skill
        ? {
              skill_id: skill.skill_id,
              skill_name: skill.skill_name
          }
        : {};

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<ISkill>({
        mode: 'onChange',
        defaultValues
    });

    const onSubmit = (data: ISkill) => {
        setPopupActive(false);
        onSubmitHandler(data);
    };

    return (
        <div className={classes.card}>
            <h2 className={classes.card__title}>{skill ? 'Редактирование навыка' : 'Добавление навыка'}</h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>Название</div>
                    <input
                        className={classes.form__input}
                        {...register('skill_name', {
                            required: 'Введите название навыка.',
                            minLength: {
                                value: 3,
                                message: 'Навык должен содержать минимум 3 символа'
                            }
                        })}
                    />
                    {errors?.skill_name && <div className={classes.form__error}>{errors.skill_name.message}</div>}
                </div>
                <div className={classes.form__submit}>
                    <CommonButton variant="secondary">{skill ? 'Изменить' : 'Добавить'}</CommonButton>
                </div>
            </form>
        </div>
    );
};

export default SkillForm;
