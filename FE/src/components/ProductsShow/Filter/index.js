import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Collection } from '../../../fakeApi';
import DoubleSlider from '../../DoubleSlider';
import ShowAndHide from '../../ShowAndHide';
import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

function Filter({ collections, collection, addParams, valueMinMax }) {
    const [searchParams] = useSearchParams();
    const [collectioned, setCollectioned] = useState(collection);
    const [priceMin, setPriceMin] = useState(
        searchParams.get('price') ? Number(searchParams.get('price').split('-')[0]) : valueMinMax.min,
    );
    const [priceMax, setPriceMax] = useState(
        searchParams.get('price') ? Number(searchParams.get('price').split('-')[1]) : valueMinMax.max,
    );

    // useEffect(() => {
    //     setCollection(searchParams.get('collection') ? searchParams.get('collection') : 'all');
    // }, [searchParams.get('collection')]);

    useEffect(() => {
        setPriceMin(searchParams.get('price') ? Number(searchParams.get('price').split('-')[0]) : valueMinMax.min);
        setPriceMax(searchParams.get('price') ? Number(searchParams.get('price').split('-')[1]) : valueMinMax.max);
    }, [searchParams.get('price')]);

    const handleClickCollection = (param) => {
        setCollectioned(param);
        // setParams({ ...params, collection: param });
        addParams({ collection: param });
    };

    const handleFilterPrice = (event, min, max) => {
        const priceParam = `${min}-${max}`;

        addParams({ price: priceParam });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>Filter by</h2>
            </div>
            {collections && (
                <ShowAndHide title="Collection">
                    <div className={cx('list')}>
                        {collections.map((item, index) => (
                            <div
                                onClick={() => handleClickCollection(item.value)}
                                className={cx('filter-item', [collection === item.value ? 'active' : ''])}
                                key={index}
                            >
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </ShowAndHide>
            )}
            <ShowAndHide title="Price">
                <DoubleSlider
                    minValue={valueMinMax.min}
                    maxValue={valueMinMax.max}
                    defaultMin={priceMin}
                    defaultMax={priceMax}
                    handleMouseUp={handleFilterPrice}
                />
            </ShowAndHide>
        </div>
    );
}

export default Filter;
