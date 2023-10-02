import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import useDelayUnmount from '../../hooks/useDelayUnmount';
import CartPopup from '../CartPopup';
import styles from './CartIcon.module.scss';
import { closePopupCart, openPopupCart } from '../../store/actions/userActions';

const cx = classNames.bind(styles);

function CartIcon({ data }) {

    const [cartState, dispatch] = useContext(CartContext);
    const mounted = useDelayUnmount(cartState.openPopup, 300);
    console.log(cartState);

    const [cartAmount, setCartAmount] = useState(cartState.cart.length);

    useEffect(() => {
        setCartAmount(cartState.cart.length);
    }, [cartState.cart.length]);

    const handleCloseCart = () => {
        dispatch(closePopupCart())
    };

    return (
        <>
            <div data-amount={cartAmount} className={cx('cart')} onClick={() => dispatch(openPopupCart())}>
                <FontAwesomeIcon className={cx('icon')} icon={faCartShopping} />
            </div>
            {mounted && <CartPopup onClose={handleCloseCart} onMounted={cartState.openPopup} />}
        </>
    );
}

export default CartIcon;
