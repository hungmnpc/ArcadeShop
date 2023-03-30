import classNames from 'classnames/bind';
import { images } from '../../../../assets/images';
import styles from './Banner.module.scss';
import CardBanner from './CardBanner';

const cx = classNames.bind(styles);

const data = {
    title1: 'Power up your game',
    title2: 'Cyber Kid infinite',
    title3: 'Now Available on PC & Console',
};

function Banner() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('over-lay')}></div>
            <div className={cx('container')}>
                <div className={cx('card')}>
                    <CardBanner data={data} />
                </div>
                <div className={cx('image')}>
                    <img src={images.bannerImage} alt="image1" />
                </div>
            </div>
        </div>
    );
}

export default Banner;
