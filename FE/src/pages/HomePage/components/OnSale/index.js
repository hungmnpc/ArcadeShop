import classNames from 'classnames/bind';
import { images } from '../../../../assets/images';
import Button from '../../../../components/Button';
import styles from './OnSale.module.scss';

const cx = classNames.bind(styles);

const title = 'Spend & Save';
const text = 'Save 20% when you spend more than $125';

function OnSale() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image')}>
                <img src={images.saleImage} alt={title} />
            </div>
            <div className={cx('content')}>
                <h2 className={cx('title')}>{title}</h2>
                <p className={cx('text')}>{text}</p>
                <Button to="/on_sale" rounded={true} primary2>
                    Shop Now
                </Button>
            </div>
        </div>
    );
}

export default OnSale;
