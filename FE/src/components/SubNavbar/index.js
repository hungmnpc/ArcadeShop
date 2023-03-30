import { faArrowRightToBracket, faBars, faCaretDown, faCaretUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { images } from '../../assets/images';
import Button from '../Button';
import ShowAndHide from '../ShowAndHide';
import UserNavbar from '../UserNavbar';

import styles from './SubNavbar.module.scss';
import UserSubNavbar from './UserSubNavbar';

const cx = classNames.bind(styles);

const navbar = [
    {
        title: 'Products',
        to: '/products',
        drop: [
            {
                title: 'Best Sellers',
                to: '/best_sellers',
            },
            {
                title: 'Games',
                to: '/games',
            },
            {
                title: 'Consoles',
                to: '/consoles',
            },
            {
                title: 'Controllers',
                to: '/controllers',
            },
            {
                title: 'Accessories',
                to: '/accessories',
            },
        ],
    },
    {
        title: 'On Sale',
        to: '/on_sale',
    },
    {
        title: 'Contact Us',
        to: '/contact',
    },
];

function SubNavbar({ isMounted }) {
    const user = true;
    const dropRef = useRef();

    const [isOpenDrop, setIsOpenDrop] = useState(false);

    return (
        <div className={cx('wrapper', [isMounted ? 'mounted' : 'unmounted'])}>
            <div className={cx('content')}>
                <div className={cx('account')}>
                    <UserSubNavbar />
                </div>
                <div className={cx('navbar')}>
                    <div className={cx('navbar_content')}>
                        {navbar.map((item, index) => (
                            <div className={cx('navbar_item')} key={index}>
                                <div className={cx('title')}>
                                    <Button to={item.to} transparent>
                                        {item.title}
                                    </Button>
                                    {item.drop && (
                                        <>
                                            <FontAwesomeIcon
                                                onClick={() => setIsOpenDrop(!isOpenDrop)}
                                                className={cx('navbar_toggle')}
                                                icon={isOpenDrop ? faCaretUp : faCaretDown}
                                            />
                                        </>
                                    )}
                                </div>

                                {item.drop && (
                                    <div
                                        ref={dropRef}
                                        className={cx('drop')}
                                        style={isOpenDrop ? { height: dropRef.current.scrollHeight + 'px' } : {}}
                                    >
                                        {item.drop.map((item, index) => (
                                            <Button key={index} to={item.to} transparent>
                                                {item.title}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubNavbar;
