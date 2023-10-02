import { startCase } from 'lodash';
import { addNewProductToCart } from '../../utils/request';
import actionTypes from '../actions/actionTypes';

export const cartInitialState = {
    cart: localStorage.getItem('cart') !== null ? JSON.parse(localStorage.getItem('cart')) : [],
    openPopup: false
};

const addProductToCart = (product, quantity, id, state) => {
    console.log();

    const updatedCart = [...state.cart];
    const index = updatedCart.findIndex((cart) => cart.id === product.id);
    if (index !== -1) {
        const updatedItem = {
            ...updatedCart[index],
        };
        updatedItem.quantity += quantity;


        updatedCart[index] = updatedItem;
    } else {
        updatedCart.push({ cartId: id, ...product, quantity: quantity });
    }
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return {
        ...state,
        cart: updatedCart,
        openPopup: true
    };
};

const removeProduct = (id, state) => {
    let updatedCart = [...state.cart];
    updatedCart = updatedCart.filter((cart) => cart.id !== id);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return {
        ...state,
        cart: updatedCart,
    };
};

const cartReducer = (state = cartInitialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_CART:
            return addProductToCart(action.product, action.quantity, action.id, state);
        case actionTypes.REMOVE_CART:
            return removeProduct(action.id, state);
        case actionTypes.OPEN_CART_POPUP:
            return {
                ...state,
                openPopup: true,
            }
        case actionTypes.CLOSE_CART_POPUP:
            return {
                ...state,
                openPopup: false,
            }
        case actionTypes.GET_CART:
            return {
                cart: action.cart,
                openPopup: false
            }
        case actionTypes.EMPTY_CART:
            return {
                cart: [],
                openPopup: false
            }

        default:
            return state;
    }
};

export default cartReducer;
