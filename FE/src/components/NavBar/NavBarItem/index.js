import classNames from 'classnames/bind';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../Button';
import DropDown from '../../DropDown';
import styles from './NavBarItem.module.scss';

const cx = classNames.bind(styles);

function NavBarItem({ data, isActive, onClick }) {
    const [showSubMenu, setShowSubMenu] = useState(false);

    let location = useLocation();

    return (
        <>
            <div
                className={cx('navbar-item')}
                onMouseOver={() => {
                    setShowSubMenu(true);
                }}
                onMouseOut={() => {
                    setShowSubMenu(false);
                }}
            >
                <Button className={cx([location.pathname === data.to ? 'active' : ''])} to={data.to} transparent>
                    {data.title}
                </Button>
                {showSubMenu && data.drop && <DropDown items={data.drop} isShow={showSubMenu} />}
            </div>
        </>
    );
}

export default NavBarItem;
