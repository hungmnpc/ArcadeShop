import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';

const cx = classNames.bind(styles);

function ShopByCategory({ data }) {
    const text = 'SHOP BY CATEGORY';

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <h2>{text}</h2>
                </div>
                <div className={cx('content')}>
                    {data.map((category, index) => (
                        <Link to={category.to} className={cx('category')} key={index}>
                            <div className={cx('category-img')}>
                                <img src={category.image} alt={category.category} />
                            </div>
                            <p className={cx('category-name')}>{category.category}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ShopByCategory;
