import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ProductsShow from '../../components/ProductsShow';
import { Collection } from '../../fakeApi';
import styles from './ProductsPage.module.scss';

const cx = classNames.bind(styles);

function ProductsPage({ title, data }) {
    const [products, setProducts] = useState(data);

    useEffect(() => {
        setProducts(data);
    }, [data]);

    const collections = Collection;
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
            <ProductsShow collections={collections} data={products} />
        </div>
    );
}

export default ProductsPage;
