import classNames from 'classnames/bind';
import Button from '../../../../../components/Button';
import styles from '../Banner.module.scss';

const cx = classNames.bind(styles);

function CardBanner({ data, center, card2, btn = 'Buy Now' }) {
    const classes = cx('card-wrapper', {
        center,
        card2,
    });

    return (
        <div className={classes}>
            <p className={cx('title1')}>{data.title1}</p>
            <h2 className={cx('title2')}>{data.title2}</h2>
            {data.title_sub && <h3 className={cx('title-sub')}>{data.title_sub}</h3>}
            <p className={cx('title1')}>{data.title3}</p>
            <Button className={cx('btn-games')} to="/games" rounded={true} w25>
                {btn}
            </Button>
        </div>
    );
}

export default CardBanner;
