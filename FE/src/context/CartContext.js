import { createContext, useContext, useEffect, useReducer } from 'react';
import cartReducer, { cartInitialState } from '../store/reduces/cartReducer';
import { get } from '../utils/request';
import { emptyCart, getCart } from '../store/actions/userActions';
import userReducer from '../store/reduces/userReducer';
import { AuthContext } from './userContext';

export const CartContext = createContext();
function CartProvider({ children }) {
    const [cartState, dispatch] = useReducer(cartReducer, cartInitialState);
    const [userState, userDispatch] = useContext(AuthContext);
    console.log(userState);

    useEffect(() => {
        console.log('123');
        if (userState.accessToken !== null) {
            get("/api/v1/carts")
            .then(response => {
                console.log(response)
                const cart = response.data.map(item => {
                    return {
                        cartId: item.id,
                        ...item.product,
                        quantity: item.quantity
                    }
                })
                dispatch(getCart(cart))
            })
            .catch(error => {
                console.error(error)
            })
        } else {
            dispatch(emptyCart())
        }
    },[localStorage.getItem('isLoggedIn'), userState.accessToken])


    return <CartContext.Provider value={[cartState, dispatch]}>{children}</CartContext.Provider>;
}

export default CartProvider;
