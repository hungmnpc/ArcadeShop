import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { images } from '../../../../assets/images';
import CardBanner from '../Banner/CardBanner';
import styles from './Coupon.module.scss';
import Aos from 'aos';
import 'aos/dist/aos.css';

const cx = classNames.bind(styles);

const data = {
    title1: "THIS WEEK'S DEALS",
    title2: '10%',
    title_sub: 'off all games',
};

function Coupon() {
    useEffect(() => {
        Aos.init({
            duration: 900,
            disable: function () {
                const maxWidth = 400;
                return window.innerWidth <= maxWidth;
            },

            once: true,
        });
    }, [window.innerWidth]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div data-aos-anchor-placement="bottom-bottom" data-aos="fade-left" className={cx('card')}>
                    <CardBanner btn={'Shop Now'} data={data} center card2 />
                </div>

                <div className={cx('image')}>
                    <div
                        data-aos-anchor-placement="center-bottom"
                        data-aos="fade-right"
                        className={cx('img1', 'coupon-img')}
                    >
                        <img src={images.couponImage1} alt="coupon" />
                    </div>
                    <div data-aos-anchor-placement="top-bottom" data-aos="fade-up" className={cx('img2', 'coupon-img')}>
                        <img src={images.couponImage2} alt="coupon" />
                    </div>
                    <div
                        data-aos-anchor-placement="center-bottom"
                        data-aos="fade-down"
                        className={cx('img3', 'coupon-img')}
                    >
                        <img src={images.couponImage3} alt="coupon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Coupon;
