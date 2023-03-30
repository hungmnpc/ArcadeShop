import classNames from 'classnames/bind';

import Button from '../Button';
import styles from './DropDown.module.scss';

const cx = classNames.bind(styles);

function DropDown({ items = [], isShow }) {
    return (
        <div className={cx('wrapper', [isShow ? 'show' : ''])}>
            <div className={cx('content')}>
                {items.map((item, index) => (
                    <div className="submenu-item" key={index}>
                        <Button transparent={true} to={item.to}>
                            {item.title}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DropDown;
