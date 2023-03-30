import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import useDelayUnmount from '../../hooks/useDelayUnmount';
import CartPopup from '../CartPopup';
import styles from './CartIcon.module.scss';

const cx = classNames.bind(styles);

function CartIcon({ data }) {
    const [show, setShow] = useState(false);

    const mounted = useDelayUnmount(show, 300);
    const [cartState] = useContext(CartContext);

    const [cartAmount, setCartAmount] = useState(cartState.cart.length);

    useEffect(() => {
        setCartAmount(cartState.cart.length);
    }, [cartState.cart.length]);

    const handleCloseCart = () => {
        setShow(false);
    };

    return (
        <>
            <div data-amount={cartAmount} className={cx('cart')} onClick={() => setShow(true)}>
                <FontAwesomeIcon className={cx('icon')} icon={faCartShopping} />
            </div>
            {mounted && <CartPopup onClose={handleCloseCart} onMounted={show} />}
        </>
    );
}

export default CartIcon;
