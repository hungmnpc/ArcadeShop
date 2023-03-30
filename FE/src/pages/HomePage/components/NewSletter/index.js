import classNames from 'classnames/bind';
import { images } from '../../../../assets/images';
import FormEmail from '../../../../components/FormEmail';
import styles from './NewSletter.module.scss';

const cx = classNames.bind(styles);

function NewSletter() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <div className={cx('overlay')} />
                <div className={cx('content')}>
                    <h3 className={cx('title')}>NewSletter</h3>
                    <p className={cx('detail')}>Sign up to receive updates on new products and special offers</p>
                    <div className={cx('form')}>
                        <FormEmail />
                    </div>
                </div>
            </div>
            <div className={cx('bottom')}>
                <div
                    // data-aos="fade-up"
                    // data-aos-anchor-placement="top-bottom"
                    // data-duration="500"
                    className={cx('image')}
                >
                    <img src={images.gameStack} alt="gamestack" />
                </div>
            </div>
        </div>
    );
}

export default NewSletter;
