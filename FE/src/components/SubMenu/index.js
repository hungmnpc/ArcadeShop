import classNames from 'classnames/bind';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/userContext';
import actionTypes from '../../store/actions/actionTypes';
import { processLogout } from '../../store/actions/userActions';
import Button from '../Button';
import styles from './SubMenu.module.scss';

const cx = classNames.bind(styles);

function SubMenu({ items }) {
    const navigate = useNavigate();

    const [userState, dispatch] = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        dispatch(processLogout());
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {items.map((item, index) => (
                    <div className={cx('item', [item.isBorderTop ? 'border_top' : ''])} key={index}>
                        <Button onClick={item.to === '/logout' ? handleLogout : undefined} transparent>
                            {item.title}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubMenu;
