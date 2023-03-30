import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../../components/Button';
import { CartContext } from '../../../../../context/CartContext';
import { addCart } from '../../../../../store/actions/userActions';
import styles from '../CarouselProducts.module.scss';

const cx = classNames.bind(styles);

function CarouselItem({ data, btn_full }) {
    const [cartState, dispatch] = useContext(CartContext);
    return (
        <div className={cx('product')}>
            <div className={cx('image')}>
                <Link to={`/product_page/${data.id}`}>
                    <img src={data.image} alt={data.name} />
                    {data.sale_price && <div className={cx('sale')}>Sale</div>}
                </Link>
            </div>
            <Link to={`/product_page/${data.id}`}>
                <h1 className={cx('name')}>{data.name}</h1>
            </Link>
            <Link to={`/product_page/${data.id}`}>
                <p className={cx('price', [data.sale_price ? 'discount' : ''])}>{data.list_price}$</p>

                {data.sale_price && <p className={cx('price')}>{data.sale_price}$</p>}
            </Link>
            <Button
                className={cx('btn-add', { btn_full })}
                rightIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                rounded={true}
                primary
                onClick={() => {
                    dispatch(addCart(data, 1));
                }}
            >
                Add to Cart
            </Button>
        </div>
    );
}

export default CarouselItem;
