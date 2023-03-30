import { faCaretDown, faCaretUp, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../../assets/images';
import Button from '../../Button';
import styles from '../SubNavbar.module.scss';

const cx = classNames.bind(styles);
const userMenu = [
    {
        title: 'My Orders',
        to: '/account/my_orders',
    },
    {
        title: 'My Addresses',
        to: '/account/my_addresses',
    },
    {
        title: 'My Wallet',
        to: '/account/my_wallet',
    },
    {
        title: 'My Subscriptions',
        to: '/account/my_subscriptions',
    },
    {
        title: 'My Account',
        to: '/account/my_account',
    },
    {
        title: 'Log Out',
        to: '/logout',
        icon: faRightFromBracket,
        isBorderTop: true,
    },
];
function UserSubNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const user = true;
    const optionsRef = useRef();

    return (
        <div className={cx('account_wrapper')}>
            {user ? (
                <>
                    <div onClick={() => setIsOpen(!isOpen)} className={cx('user')}>
                        <div className={cx('avatar')}>
                            <img src={images.logo.default} alt="avatar" />
                        </div>
                        <div className={cx('toggle')}>
                            <FontAwesomeIcon className={cx('toggle_icon')} icon={isOpen ? faCaretUp : faCaretDown} />
                        </div>
                    </div>
                    <div
                        ref={optionsRef}
                        className={cx('user_option')}
                        style={isOpen ? { height: optionsRef.current.scrollHeight + 'px' } : {}}
                    >
                        <div className={cx('options')}>
                            {userMenu.map((option, index) => (
                                <Button
                                    rightIcon={option.icon ? <FontAwesomeIcon icon={option.icon} /> : null}
                                    to={option.to}
                                    key={index}
                                    transparent
                                >
                                    {option.title}
                                </Button>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className={cx('login')}>
                    <Link to="/login">
                        <FontAwesomeIcon className={cx('login_icon')} icon={faRightToBracket} />
                        <span>Login</span>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default UserSubNavbar;
