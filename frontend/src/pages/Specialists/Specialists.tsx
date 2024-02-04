import React from 'react';
import SpecialistsList from '../../components/SpecialistsList/SpecialistsList';
import classes from './Specialists.module.scss';

const Specialists = () => {
    return (
        <div className={classes.specialists}>
            <div className={classes.specialists__title}>Специалисты</div>
            <SpecialistsList />
        </div>
    );
};

export default Specialists;
