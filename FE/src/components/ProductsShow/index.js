import classNames from 'classnames/bind';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { getProductsByType, sortProducts } from '../../services/ProductService';
import Filter from './Filter';
import FilterMobile from './FilterMobile';
import ProductsGrid from './ProductsGrid';
import styles from './ProductsShow.module.scss';
import SortSelect from './SortSelect';

import { useDelayUnMount } from '../../hooks';

const cx = classNames.bind(styles);

function ProductsShow({ collections, data }) {
    const [searchParams, setSearchParams] = useSearchParams({});

    const [openFilterMobile, setOpenFilterMobile] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setOpenFilterMobile(false);
    }, [location.search]);

    const shouldRenderChild = useDelayUnMount(openFilterMobile, 300);

    const max = Math.max(...data.map((product) => product.list_price));
    const min = Math.min(...data.map((product) => (product.sale_price ? product.sale_price : product.list_price)));
    const [min_max, setMin_Max] = useState({
        min: min,
        max: max - min <= 50 ? max + 50 : max,
    });
    const [collection, setCollection] = useState(
        searchParams.get('collection') ? searchParams.get('collection') : 'all',
    );
    const [priceMin, setPriceMin] = useState(
        searchParams.get('price') ? Number(searchParams.get('price').split('-')[0]) : min_max.min,
    );
    const [priceMax, setPriceMax] = useState(
        searchParams.get('price') ? Number(searchParams.get('price').split('-')[1]) : min_max.max,
    );

    const [products, setProducts] = useState(data);
    const [productsShow, setProductsShow] = useState(products);

    useEffect(() => {
        const max = Math.max(...products.map((product) => product.list_price));
        const min = Math.min(
            ...products.map((product) => (product.sale_price ? product.sale_price : product.list_price)),
        );
        setMin_Max({
            min: min,
            max: max - min <= 50 ? max + 50 : max,
        });
    }, [products]);

    const addParams = (params) => {
        // console.log(Object.keys(params)[0], Object.values(params)[0]);

        const newParam = { ...Object.fromEntries([...searchParams]), ...params };

        // setSearchParams(searchParams.set(Object.keys(params)[0], Object.values(params)[0]));
        setSearchParams(newParam);
    };

    useEffect(() => {
        setProductsShow(products);
    }, [products]);

    useLayoutEffect(() => {
        if (searchParams.has('price')) {
            searchParams.append('price', '');
        }
        setCollection(searchParams.get('collection'));
        setProducts(getProductsByType(data, searchParams.get('collection')));
    }, [searchParams.get('collection')]);

    useEffect(() => {
        let _product = products;
        const price = searchParams.get('price');
        if (price) {
            const min = Number(price.split('-')[0]);
            const max = Number(price.split('-')[1]);
            _product = products.slice(0).filter((product) => {
                const productPrice = product.sale_price ? product.sale_price : product.list_price;
                return productPrice >= min && productPrice <= max;
            });
        }
        setProductsShow(_product);
    }, [searchParams.get('price')]);

    const hanldeClose = () => {
        setOpenFilterMobile(false);
    };

    useEffect(() => {
        setProducts(data);
    }, [data]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('filter')}>
                <Filter collections={collections} collection={collection} valueMinMax={min_max} addParams={addParams} />
            </div>
            <div className={cx('filter_mobile')}>
                <div onClick={() => setOpenFilterMobile(true)} className={cx('btn_open')}>
                    <h4>Filter By</h4>
                </div>

                {shouldRenderChild && (
                    <FilterMobile
                        addParams={addParams}
                        collections={collections}
                        collection={collection}
                        onMounted={openFilterMobile}
                        valueMinMax={min_max}
                        onClose={hanldeClose}
                    />
                )}
            </div>

            <div className={cx('select')}>
                <SortSelect addParams={addParams} />
            </div>
            <div className={cx('products')}>
                <ProductsGrid data={productsShow} />
            </div>
        </div>
    );
}

export default ProductsShow;
