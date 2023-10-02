import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo,
});

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT,
});

export const login = () => ({
    type: actionTypes.LOGIN,
});

export const addCart = (product, quantity, id) => ({
    type: actionTypes.ADD_CART,
    product: product,
    quantity: quantity,
    id: id
});

export const removeCart = (id) => ({
    type: actionTypes.REMOVE_CART,
    id: id,
});

export const rememberAccount = (account = { email: '', password: '' }) => ({
    type: actionTypes.REMEMBER_ACCOUNT,
    account: account,
});

export const openPopupCart = () => ({
    type: actionTypes.OPEN_CART_POPUP
});

export const closePopupCart = () => ({
    type: actionTypes.CLOSE_CART_POPUP
});

export const getCart = (cart) => ({
    type: actionTypes.GET_CART,
    cart: cart
})

export const emptyCart = () => ({
    type: actionTypes.EMPTY_CART
})




// export const addNewProduct = ()