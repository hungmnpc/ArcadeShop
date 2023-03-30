import actionTypes from '../actions/actionTypes';

export const cartInitialState = {
    cart: localStorage.getItem('cart') !== null ? JSON.parse(localStorage.getItem('cart')) : [],
};

const addProductToCart = (product, quantity, state) => {
    const updatedCart = [...state.cart];
    const index = updatedCart.findIndex((cart) => cart.id === product.id);
    if (index !== -1) {
        const updatedItem = {
            ...updatedCart[index],
        };
        updatedItem.quantity += quantity;
        updatedCart[index] = updatedItem;
    } else {
        updatedCart.push({ ...product, quantity: quantity });
    }
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return {
        ...state,
        cart: updatedCart,
    };
};

const removeProduct = (id, state) => {
    let updatedCart = [...state.cart];
    updatedCart = updatedCart.filter((cart) => cart.id !== id);
    console.log(updatedCart);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return {
        ...state,
        cart: updatedCart,
    };
};

const cartReducer = (state = cartInitialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_CART:
            return addProductToCart(action.product, action.quantity, state);
        case actionTypes.REMOVE_CART:
            return removeProduct(action.id, state);

        default:
            return state;
    }
};

export default cartReducer;
