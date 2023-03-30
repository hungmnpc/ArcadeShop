import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import style from './DashboardBtn.module.scss';

const cx = classNames.bind(style);

function DashboardBtn({ to, href, primary, secondary, children, className, icon, onClick, ...passProps }) {
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

    const classes = cx('wrapper', {
        primary,
        secondary,
        [className]: className,
    });

    return (
        <Comp className={classes} {..._props}>
            {icon && <FontAwesomeIcon className={cx('icon')} icon={icon} />}
            <span className={cx('title')}>{children}</span>
        </Comp>
    );
}

export default DashboardBtn;
