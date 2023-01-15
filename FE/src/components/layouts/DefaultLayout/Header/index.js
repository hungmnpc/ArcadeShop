import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { faArrowRightToBracket, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';
import { images } from '../../../../assets/images';
import CartIcon from '../../../CartIcon';
import Navbar from '../../../NavBar';
import { Link, useLocation } from 'react-router-dom';
import UserNavbar from '../../../UserNavbar';
import SubNavbar from '../../../SubNavbar';
import { useDelayUnMount } from '../../../../hooks';
import { AuthContext } from '../../../../context/userContext';

const cx = classNames.bind(styles);

const WEB_NAME = 'ARCADE';

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

function Header() {
    const [isOver, setIsOver] = useState(false);
    const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);

    const shouldRenderChild = useDelayUnMount(isOpenSubMenu, 500);

    const location = useLocation();

    const [userState] = useContext(AuthContext);

    useEffect(() => {
        setIsOpenSubMenu(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 767) {
                setIsOpenSubMenu(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useLayoutEffect(() => {
        const handleOver = () => {
            if (window.scrollY >= 100) {
                setIsOver(true);
            } else {
                setIsOver(false);
            }
        };
        window.addEventListener('scroll', handleOver);

        return () => window.removeEventListener('scroll', handleOver)
    }, []);

    return (
        <div className={cx('wrapper', [isOver ? 'over' : ''])}>
            <div className={cx('inner')}>
                <Link to="/" className={cx('logo')}>
                    <img src={images.logo.default} alt="logo" />
                    <h1 className={cx('web-name')}>{WEB_NAME}</h1>
                </Link>
                <div className={cx('actions')}>
                    <div className={cx('navbar')}>
                        <Navbar navbarItems={navbar} />
                    </div>
                    {!userState.isLoggedIn ? (
                        <div className={cx('login')}>
                            <Link to="/login">
                                <FontAwesomeIcon className={cx('icon')} icon={faArrowRightToBracket} />
                                <p>Log In</p>
                            </Link>
                        </div>
                    ) : (
                        <div className={cx('user')}>
                            <UserNavbar />
                        </div>
                    )}
                    <div className={cx('cart')}>
                        <CartIcon data={6} />
                    </div>

                    <div onClick={() => setIsOpenSubMenu(!isOpenSubMenu)} className={cx('menu')}>
                        <FontAwesomeIcon className={cx('icon_menu')} icon={isOpenSubMenu ? faXmark : faBars} />
                    </div>

                    {shouldRenderChild && <SubNavbar isMounted={isOpenSubMenu} />}
                </div>
            </div>
        </div>
    );
}

export default Header;
