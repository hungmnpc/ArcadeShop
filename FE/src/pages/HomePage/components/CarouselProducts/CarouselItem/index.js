import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../../../components/Button';
import { CartContext } from '../../../../../context/CartContext';
import { addCart } from '../../../../../store/actions/userActions';
import styles from '../CarouselProducts.module.scss';
import { addNewProductToCart } from '../../../../../utils/request';

const cx = classNames.bind(styles);

function CarouselItem({ data, btn_full }) {
    const [cartState, dispatch] = useContext(CartContext);
    return (
        <div className={cx('product')}>
            <div className={cx('image')}>
                <Link to={`/product_page/${data.id}`}>
                    <img src={`data:image/jpeg;base64,${data.imageSet[0].imageBase64}`} alt={data.name} />
                    {data.sale_price && <div className={cx('sale')}>Sale</div>}
                </Link>
            </div>
            <Link to={`/product_page/${data.id}`}>
                <h1 className={cx('name')}>{data.name}</h1>
            </Link>
            <Link to={`/product_page/${data.id}`}>
                <p className={cx('price', [data.discountValue > 0 ? 'discount' : ''])}>{data.price}$</p>

                {data.discountValue > 0 && <p className={cx('price')}>{data.price * (100 - data.discountValue) / 100}$</p>}
            </Link>
            <Button
                className={cx('btn-add', { btn_full })}
                rightIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                rounded={true}
                primary
                onClick={() => {
                    
                    addNewProductToCart(data.id, 1)
                    .then(response => {
                        console.log(response.data.id);
                        dispatch(addCart(data, 1, response.data.id));
                    })
                    .catch(error => console.error(error))
                }}
            >
                Add to Cart
            </Button>
        </div>
    );
}

export default CarouselItem;
