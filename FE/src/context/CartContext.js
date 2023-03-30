import { createContext, useReducer } from 'react';
import cartReducer, { cartInitialState } from '../store/reduces/cartReducer';

export const CartContext = createContext();
function CartProvider({ children }) {
    const [cartState, dispatch] = useReducer(cartReducer, cartInitialState);

    return <CartContext.Provider value={[cartState, dispatch]}>{children}</CartContext.Provider>;
}

export default CartProvider;
