import React, {Dispatch, FC, SetStateAction} from 'react';
import classes from './Popup.module.scss';

interface PopupProps {
    popupActive: boolean;
    setPopupActive: Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode;
}

const Popup: FC<PopupProps> = ({popupActive, setPopupActive, children}) => {
    if (popupActive) {
        return (
            <div onClick={() => setPopupActive(false)} className={classes.popup}>
                <div onClick={(e) => e.stopPropagation()} className={classes.popup__content}>
                    {children}
                </div>
            </div>
        );
    } else {
        return <></>;
    }
};

export default Popup;
