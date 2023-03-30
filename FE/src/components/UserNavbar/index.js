import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { images } from '../../assets/images';
import Tippy from '@tippyjs/react/headless';
import styles from './UserNavbar.module.scss';
import DropDown from '../DropDown';
import SubMenu from '../SubMenu';
import axios from 'axios';
import { AuthContext } from '../../context/userContext';

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
        isBorderTop: true,
    },
];

function UserNavbar() {
    const [isShow, setIsShow] = useState(true);

    const [avatarUrl, setAvatarUrl] = useState('');

    const [userState] = useContext(AuthContext);

    return (
        <div className={cx('wrapper')}>
            <Tippy trigger="mouseenter click" interactive render={(attrs) => <SubMenu items={userMenu} />}>
                <div className={cx('avatar')}>
                    <img
                        src={
                            userState.userInfo.avatarUrl !== null ? userState.userInfo.avatarUrl : images.defaultAvatar
                        }
                        alt="user"
                    />
                    {/* <p>{localStorage.getItem('username')}</p> */}
                </div>
            </Tippy>
        </div>
    );
}

export default UserNavbar;
