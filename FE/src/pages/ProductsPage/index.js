import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ProductsShow from '../../components/ProductsShow';
import { Collection } from '../../fakeApi';
import styles from './ProductsPage.module.scss';
import { get } from '../../utils/request';

const cx = classNames.bind(styles);

function ProductsPage({ title, category }) {
    const [products, setProducts] = useState([]);
    console.log(category);
    const [collections, setCollections] = useState(Collection);

    console.log(collections);

    useEffect(() => {
        get("/api/v1/admin/products?category=" + category)
        .then(response => {
            console.log(response)
            setProducts(response.data.products)
        })
        .catch(error => {
            console.log(error)
        })

        get("/api/v1/categories/getAllFromType/" + category.toUpperCase())
        .then(response => {
            console.log(response)
            setCollections(response.data.filter(data => data.id !== 'ALL' && data.id !== category.toUpperCase()))
        })
        .catch(error => {
            console.log(error)
        })
    }, [category])

    console.log(products)

    // useEffect(() => {
    //     setProducts(data);
    // }, [data]);


    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
            <ProductsShow category={category}  collections={collections} data={products} />
        </div>
    );
}

export default ProductsPage;
