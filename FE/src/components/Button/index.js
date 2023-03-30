import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    type,
    to,
    disabled,
    href,
    w25,
    w50,
    sm,
    rounded,
    text,
    lg,
    primary,
    primary2,
    submit,
    btn_icon,
    secondary,
    transparent,
    w100,
    outline = false,
    children,
    text_black,
    className,
    leftIcon,
    rightIcon,
    icon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const _props = {
        onClick,
        ...passProps,
    };
    if (to) {
        _props.to = to;
        Comp = Link;
    } else if (href) {
        _props.href = href;
        Comp = 'a';
    }

    if (disabled) {
        Object.keys(_props).forEach((key) => {
            if (key.startsWith('on') && typeof _props[key] === 'function') {
                delete _props[key];
            }
        });
    }

    if (icon) {
        children = <FontAwesomeIcon className={cx('icon')} icon={icon} />;
    }
    const classes = cx('wrapper', {
        primary,
        primary2,
        submit,
        outline,
        transparent,
        sm,
        lg,
        w25,
        w50,
        w100,
        btn_icon,
        text,
        disabled,
        rounded,
        text_black,
        secondary,
        [className]: className,
    });

    return (
        <Comp type={type} className={classes} {..._props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
