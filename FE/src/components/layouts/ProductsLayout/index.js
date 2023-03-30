import Header from '../DefaultLayout/Header';
import classNames from 'classnames/bind';
import styles from './ProductsLayout.module.scss';
import Footer from '../DefaultLayout/Footer';

const cx = classNames.bind(styles);
function ProductsLayout({ children, title }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductsLayout;
