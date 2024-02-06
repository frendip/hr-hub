import {FC, HTMLAttributes} from 'react';
import {useAppSelector} from '../../hooks/useAppSelector';
import classes from './SkillsList.module.scss';
import clsx from 'clsx';
import React from 'react';
import SkillItem from '../SkillItem/SkillItem';

interface SkillsListProps extends HTMLAttributes<HTMLDivElement> {}

const SkillsList: FC<SkillsListProps> = ({className}) => {
    const {skills} = useAppSelector((state) => state.skills);

    return (
        <div className={clsx(className, classes.skillsList)}>
            <SkillsTitle />
            {skills.map((skill) => (
                <SkillItem key={skill.skill_id} skill={skill} />
            ))}
        </div>
    );
};

const SkillsTitle = () => {
    return (
        <>
            <div className={classes.skillsList__title}>Название</div>
            <div></div>
        </>
    );
};

export default SkillsList;
