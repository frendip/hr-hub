import React, {FC, Dispatch, SetStateAction, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import classes from './Form.module.scss';
import {useAppSelector} from '../../../hooks/useAppSelector';
import clsx from 'clsx';
import {CommonButton} from '../Button/Button';
import {IInterview, IInterviewCheckboxSkill} from '../../../types/IInterviews';
import {checkSpecialistSkillForInterview} from '../../../utils/checkSpecialistSkillForInterview';
import {checkWorkTimeIntervalForInterview} from '../../../utils/checkWorkTimeIntervalForInterview';
import {checkSpecialistInterviewsTimeInterval} from '../../../utils/checkSpecialistInterviewsTimeInterval';

interface InterviewFormProps {
    setPopupActive: Dispatch<SetStateAction<boolean>>;
    onSubmitHandler: SubmitHandler<IInterview>;
    interview?: IInterview;
}

const InterviewForm: FC<InterviewFormProps> = ({setPopupActive, onSubmitHandler, interview}) => {
    const defaultValues = interview
        ? {
              interview_id: interview.interview_id,
              applicant_name: interview.applicant_name,
              start_time: interview.start_time,
              duration_time: interview.duration_time,
              specialist_id: interview.specialist_id,
              specialist_name: interview.specialist_name
          }
        : {specialist_id: undefined, specialist_name: undefined};

    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue
    } = useForm<IInterviewCheckboxSkill>({
        mode: 'onChange',
        defaultValues
    });

    const {skills} = useAppSelector((state) => state.skills);
    const {specialists} = useAppSelector((state) => state.specialists);
    const {interviews} = useAppSelector((state) => state.interviews);

    useEffect(() => {
        if (interview) {
            interview.skills.forEach((skill) => {
                setValue(`skills.${skill.skill_id}`, {[skill.skill_id]: true});
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (data: IInterviewCheckboxSkill) => {
        const checkedSkills = skills.filter((skill) => data.skills[skill.skill_id]);
        const changedInterview = {...data, skills: checkedSkills} as IInterview;

        const selectedSpecialist = specialists.find(
            (specialist) => specialist.specialist_id === Number(changedInterview.specialist_id)
        );

        if (selectedSpecialist) {
            if (checkSpecialistSkillForInterview(changedInterview, selectedSpecialist)) {
                alert('Специалисту не хватает навыков для проведения собеседования');
                return;
            }

            if (checkWorkTimeIntervalForInterview(changedInterview, selectedSpecialist)) {
                alert('Длительность интервью выходит за интервал рабочего времени специалиста');
                return;
            }

            if (checkSpecialistInterviewsTimeInterval(changedInterview, selectedSpecialist, interviews)) {
                alert('Специалист в данное время проводит другое собеседование');
                return;
            }
        }

        changedInterview.specialist_id = selectedSpecialist?.specialist_id;
        changedInterview.specialist_name = selectedSpecialist?.full_name;

        setPopupActive(false);
        onSubmitHandler(changedInterview);
    };

    return (
        <div className={classes.card}>
            <h2 className={classes.card__title}>
                {interview ? 'Редактирование информации о собеседовании' : 'Добавление нового собеседования'}
            </h2>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>ФИО кандидата</div>
                    <input
                        className={classes.form__input}
                        {...register('applicant_name', {
                            required: 'Введите ФИО кандидата.',
                            minLength: {
                                value: 7,
                                message: 'ФИО должны содержать минимум 7 символа'
                            }
                        })}
                    />
                    {errors?.applicant_name && (
                        <div className={classes.form__error}>{errors.applicant_name.message}</div>
                    )}
                </div>
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>Время начала собеседования</div>
                    <input
                        className={classes.form__input}
                        {...register('start_time', {
                            required: 'Введите время начала собеседования',
                            pattern: {
                                value: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
                                message: 'Время должно быть в формате: HH:MM:SS'
                            }
                        })}
                    />
                    {errors?.start_time && <div className={classes.form__error}>{errors.start_time.message}</div>}
                </div>
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>Продолжительность собеседования</div>
                    <input
                        className={classes.form__input}
                        {...register('duration_time', {
                            required: 'Введите продолжительность собеседования',
                            pattern: {
                                value: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
                                message: 'Время должно быть в формате: HH:MM:SS'
                            }
                        })}
                    />
                    {errors?.duration_time && <div className={classes.form__error}>{errors.duration_time.message}</div>}
                </div>
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>Необходимые навыки</div>
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
                <div className={classes.form__section}>
                    <div className={classes.form__sectionTitle}>Специалист</div>
                    <select className={classes.formSection} id="specialist_id" {...register('specialist_id')}>
                        <option value="">Выберите специалиста проводящего собеседование</option>
                        {specialists.map((specialists) => (
                            <option key={specialists.specialist_id} value={specialists.specialist_id}>
                                {specialists.full_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={classes.form__submit}>
                    <CommonButton variant="secondary">{interview ? 'Изменить' : 'Добавить'}</CommonButton>
                </div>
            </form>
        </div>
    );
};

export default InterviewForm;
