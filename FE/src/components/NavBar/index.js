import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './NavBar.module.scss';
import NavBarItem from './NavBarItem';

const cx = classNames.bind(styles);

function Navbar({ navbarItems = [] }) {
    const [active, setActive] = useState();

    const handleOnClick = (e, item) => {
        setActive(item);
    };

    return (
        <div className={cx('wrapper')}>
            {navbarItems.map((item, index) => (
                <NavBarItem isActive={active === item.title} onClick={handleOnClick} data={item} key={index} />
            ))}
        </div>
    );
}

export default Navbar;
