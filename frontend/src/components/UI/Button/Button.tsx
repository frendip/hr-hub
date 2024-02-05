import {FC, HTMLAttributes} from 'react';
import classes from './Button.module.scss';
import clsx from 'clsx';

interface BaseButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const BaseButton: FC<BaseButtonProps> = ({children, className, ...props}) => {
    return (
        <button className={clsx(classes.baseBtn, className)} {...props}>
            {children}
        </button>
    );
};

interface CommonButtonProps extends BaseButtonProps {
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary';
    stretched?: boolean;
    textPositionLeft?: boolean;
}

const CommonBtnSize = {
    small: classes.commonBtn__small,
    medium: classes.commonBtn__medium,
    large: classes.commonBtn__large,
    stretched: classes.commonBtn__stretched
};

const CommonBtnVariant = {
    primary: classes.commonBtn__primary,
    secondary: classes.commonBtn__secondary
};

export const CommonButton: FC<CommonButtonProps> = ({
    children,
    size = 'medium',
    variant = 'primary',
    stretched = false,
    textPositionLeft = false,
    className,
    ...props
}) => {
    return (
        <BaseButton
            className={clsx(
                className,
                classes.commonBtn,
                CommonBtnSize[size],
                CommonBtnVariant[variant],
                stretched && classes.commonBtn__stretched,
                textPositionLeft && classes.commonBtn__textPositionLeft
            )}
            {...props}
        >
            {children}
        </BaseButton>
    );
};
