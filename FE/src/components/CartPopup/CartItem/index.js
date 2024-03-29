import { faAngleDown, faAngleUp, faMarker, faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../context/CartContext';
import { useDebounce } from '../../../hooks';
import { addCart, removeCart } from '../../../store/actions/userActions';
import style from './CartItem.module.scss';
import { addNewProductToCart } from '../../../utils/request';

const cx = classNames.bind(style);
function CartItem({ data }) {
    const officialPrice = data.price * (100 - data.discountValue) / 100;

    const [cartState, dispatch] = useContext(CartContext);

    const [quantity, setQuantity] = useState(data.quantity);

    const quantityDebounce = useDebounce(quantity, 500);

    console.log(Number.parseInt(quantityDebounce))

    useEffect(() => {
        if (Number.parseInt(quantityDebounce) !== data.quantity) {
            addNewProductToCart(data.id, Number.parseInt(quantityDebounce) - data.quantity)
                        .then(response => {
                            console.log(response.data.id);
                            dispatch(addCart(data, Number.parseInt(quantityDebounce) - data.quantity, response.data.id));
                        })
                        .catch(error => console.error(error))
        }
        
    }, [quantityDebounce]);

    const handleRemoveCart = () => {
        dispatch(removeCart(data.id));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('image')}>
                <img src={`data:image/jpeg;base64,${data.imageSet[0].imageBase64}`} alt={data.name} />
            </div>
            <div className={cx('info')}>
                <span className={cx('name')}>{data.name}</span>
                <div className={cx('price', [data.discountValue > 0 ? 'sale' : ''])}>
                    {data.discountValue > 0 && <span>{data.price}₫</span>}
                    <span>{officialPrice}₫</span>
                </div>
                <div className={cx('quantity')}>
                    <input
                        id="quantityInput"
                        value={quantity}
                        onChange={(e) => {
                            const quantity = e.target.value;
                            if (quantity >= 1 && quantity <= 9999) {
                                setQuantity(quantity);
                            } else if (quantity < 1) {
                                setQuantity(1);
                            }
                        }}
                        type="number"
                        min="1"
                        max="9999"
                    />
                    <div className={cx('spin')}>
                        <div
                            className={cx('sub', 'change')}
                            onClick={() => {
                                const changeQuantity = quantity - 1 < 1 ? 1 : quantity - 1;
                                setQuantity(changeQuantity);
                            }}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </div>
                        <div
                            className={cx('add', 'change')}
                            onClick={() => {
                                const changeQuantity = quantity + 1 > 9999 ? 9999 : quantity + 1;
                                setQuantity(changeQuantity);
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('removeCart')}>
                <FontAwesomeIcon icon={faXmark} onClick={handleRemoveCart} />
            </div>
        </div>
    );
}

export default CartItem;
