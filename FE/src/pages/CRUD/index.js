import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './CRUD.module.scss';

const cx = classNames.bind(styles);

function CRUD() {
    return (
        <div className={cx('wrapper')}>
            <Link to="/crud/customers">Customers Manager</Link>
            <Link to="/crud/admins">Admins Manager</Link>
            <Link to="/crud/products">Products Manager</Link>
            <Link to="/crud/categories">Categories Manager</Link>
            <Link to="/crud/brands">Brands Manager</Link>
        </div>
    );
}

export default CRUD;
