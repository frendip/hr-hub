import Sidebar from '../Sidebar/Sidebar';
import {Outlet} from 'react-router-dom';
import classes from './Layout.module.scss';

const Layout = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.content}>
                <Sidebar className={classes.sidebar} />
                <div className={classes.outletContainer}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
