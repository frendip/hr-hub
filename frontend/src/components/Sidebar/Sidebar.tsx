import {FC, HTMLAttributes} from 'react';
import {Link, useLocation} from 'react-router-dom';
import classes from './Sidebar.module.scss';
import clsx from 'clsx';
import logoIcon from '../../assets/img/logo.svg';

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

const Sidebar: FC<SidebarProps> = ({className}) => {
    const {pathname} = useLocation();

    return (
        <div className={clsx(className, classes.sidebar)}>
            <Link to={'/'} className={classes.sidebar__header}>
                <div className={classes.sidebar__logo}>
                    <img src={logoIcon} alt="logo" />
                </div>
                <div className={classes.sidebar__title}>HR Hub</div>
            </Link>
            <div className={clsx(classes.sidebar__list, classes.list)}>
                <Link
                    to={'/specialists'}
                    className={clsx(classes.list__item, pathname === '/specialists' && classes.list__item_active)}
                >
                    Специалисты
                </Link>
                <Link
                    to={'/skills'}
                    className={clsx(classes.list__item, pathname === '/skills' && classes.list__item_active)}
                >
                    Навыки
                </Link>
                <Link
                    to={'/interviews'}
                    className={clsx(classes.list__item, pathname === '/interviews' && classes.list__item_active)}
                >
                    Интервью
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
