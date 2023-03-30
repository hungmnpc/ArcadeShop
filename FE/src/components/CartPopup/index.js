import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import CartItem from './CartItem';
import styles from './CartPopup.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function CartPopup({ onClose, onMounted }) {
    const [cartState] = useContext(CartContext);

    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {
        console.log(cartState.cart);

        const subTotalUpdate = cartState.cart.reduce(
            (pre, current) => pre + (current.sale_price || current.list_price) * current.quantity,
            0,
        );

        setSubTotal(subTotalUpdate);
    }, [cartState]);

    return (
        <>
            <div className={cx('overlay')} onClick={onClose} />
            <div className={cx('wrapper', [onMounted ? 'mounted' : 'unmounted'])}>
                <div className={cx('header')}>
                    <div className={cx('close')}>
                        <FontAwesomeIcon icon={faAngleRight} onClick={onClose} />
                    </div>
                    <div className={cx('title')}>
                        <span>Cart</span>
                    </div>
                </div>
                <div className={cx('container')}>
                    {cartState.cart.length > 0 ? (
                        cartState.cart.map((data, index) => (
                            <CartItem className={cx('cart-item')} data={data} key={index} />
                        ))
                    ) : (
                        <span className={cx('emty-text')}>Cart is emty</span>
                    )}
                </div>
                <div className={cx('subtotal')}>
                    <span className={cx('title')}>Subtotal</span>
                    <span className={cx('total-price')}>{subTotal}₫</span>
                </div>
                <div className={cx('show-cart')}>
                    <Button primary={true} w100>
                        Show cart
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CartPopup;
