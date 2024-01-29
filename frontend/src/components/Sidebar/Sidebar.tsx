import {FC, HTMLAttributes} from 'react';
import {Link} from 'react-router-dom';
import classes from './Sidebar.module.scss';
import clsx from 'clsx';
import logoIcon from '../../assets/img/logo.svg';

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

const Sidebar: FC<SidebarProps> = ({className}) => {
    return (
        <div className={clsx(className, classes.sidebar)}>
            <Link to={'/'} className={classes.sidebar__header}>
                <div className={classes.sidebar__logo}>
                    <img src={logoIcon} alt="logo" />
                </div>
                <div className={classes.sidebar__title}>HR Hub</div>
            </Link>
            <div className={clsx(classes.sidebar__list, classes.list)}>
                <Link to={'/specialists'} className={classes.list__item}>
                    Специалисты
                </Link>
                <Link to={'/test1'} className={classes.list__item}>
                    test1
                </Link>
                <Link to={'/test2'} className={classes.list__item}>
                    test2
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
