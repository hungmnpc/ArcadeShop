import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './DoubleSlider.module.scss';

const cx = classNames.bind(styles);

function DoubleSlider({ minValue, maxValue, defaultMin, defaultMax, handleMouseUp }) {
    const [min, setMin] = useState(defaultMin);
    const [max, setMax] = useState(defaultMax);
    const [minPercent, setMinPercent] = useState(0);
    const [maxPercent, setMaxPercent] = useState(100);
    const [min_max, setMin_Max] = useState({
        minValue,
        maxValue,
    });

    useEffect(() => {
        setMin_Max({
            minValue,
            maxValue,
        });
        setMin(minValue);
        setMax(maxValue);
    }, [minValue, maxValue]);

    useEffect(() => {
        setMin(defaultMin);
        setMax(defaultMax);
    }, [defaultMin, defaultMax]);

    useEffect(() => {
        const minPercent_ = ((min - min_max.minValue) / (min_max.maxValue - min_max.minValue)) * 100;
        setMinPercent(minPercent_);
        // eslint-disable-next-line
    }, [min]);
    useEffect(() => {
        const maxPercent_ = ((max - min_max.minValue) / (min_max.maxValue - min_max.minValue)) * 100;
        setMaxPercent(maxPercent_);
        // eslint-disable-next-line
    }, [max]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('double-range-slider')}>
                <input
                    onMouseUp={(event) => handleMouseUp(event, min, max)}
                    className={cx('field')}
                    onChange={(e) => setMin(Math.min(e.target.value, max - 50))}
                    type="range"
                    id="input-left"
                    min={min_max.minValue}
                    max={min_max.maxValue}
                    value={min}
                />
                <input
                    onMouseUp={(event) => handleMouseUp(event, min, max)}
                    className={cx('field')}
                    onChange={(e) => setMax(Math.max(e.target.value, min + 50))}
                    type="range"
                    id="input-right"
                    min={min_max.minValue}
                    max={min_max.maxValue}
                    value={max}
                />

                <div className={cx('slider')}>
                    <div className={cx('track')}></div>
                    <div className={cx('range')} style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }} />
                    <div className={cx('thumb', 'left')} style={{ left: `${minPercent}%` }}></div>
                    <div className={cx('thumb', 'right')} style={{ right: `${100 - maxPercent}%` }}></div>
                </div>
                <div className={cx('value')}>
                    <p className={cx('min')}>{min}$</p>
                    <p className={cx('max')}>{max}$</p>
                </div>
            </div>
        </div>
    );
}

export default DoubleSlider;
