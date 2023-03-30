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

export const addCart = (product, quantity) => ({
    type: actionTypes.ADD_CART,
    product: product,
    quantity: quantity,
});

export const removeCart = (id) => ({
    type: actionTypes.REMOVE_CART,
    id: id,
});

export const rememberAccount = (account = { email: '', password: '' }) => ({
    type: actionTypes.REMEMBER_ACCOUNT,
    account: account,
});


// export const addNewProduct = ()