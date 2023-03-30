import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductsGrid.module.scss';

import CarouselItem from '../../../pages/HomePage/components/CarouselProducts/CarouselItem';
import { getProductsByType, sortProducts } from '../../../services/ProductService';

const cx = classNames.bind(styles);

function ProductsGrid({ data }) {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState(data);
    // const [productsShow, setProductsShow] = useState(products);

    useEffect(() => {
        setProducts((prev) => sortProducts(prev, searchParams.get('sort')));
    }, [searchParams.get('sort')]);

    useEffect(() => {
        setProducts(data);
    }, [data]);

    // useEffect(() => {
    //     let _product = products;
    //     const price = searchParams.get('price');
    //     if (price) {
    //         const min = Number(price.split('-')[0]);
    //         const max = Number(price.split('-')[1]);
    //         _product = products.slice(0).filter((product) => {
    //             const productPrice = product.sale_price ? product.sale_price : product.list_price;
    //             return productPrice >= min && productPrice <= max;
    //         });
    //     }

    //     setProductsShow(getProductsByType(_product, searchParams.get('collection')));
    // }, [searchParams.get('collection'), searchParams.get('price'), products]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {products.map((product, index) => (
                    <div key={`${product.name + index}`}>
                        <CarouselItem data={product} btn_full />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsGrid;
