import actionTypes from '../actions/actionTypes';
import jwtDecode from 'jwt-decode';
import { emptyCart } from '../actions/userActions';

const getUserInfoByAccessToken = (accessToken) => {
    if (accessToken) {
        const decode = jwtDecode(accessToken);
        if (tokenValid(decode.exp)) {
            return {
                name: decode.sub,
                roles: decode.roles,
                avatarUrl: decode.avatarUrl,
            };
        } else {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('access_token');
        }
    }

    return null;
};

const tokenValid = (expiry) => {
    const currentDate = Date.now() / 1000;
    return currentDate < expiry;
};

function setSessionID(sessionID) {
    const date = new Date();
    date.setTime(date.getTime() + (60 * 60 * 1000)); // thời hạn sống của cookie là 1 giờ
    const expires = "expires=" + date.toUTCString();
    document.cookie = "JSESSIONID=" + sessionID + ";" + expires + ";path=/";
  }

export const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    userInfo: localStorage.getItem('access_token')
        ? getUserInfoByAccessToken(localStorage.getItem('access_token'))
        : null,
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            console.log(action.userInfo.accessToken);
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('access_token', action.userInfo.accessToken);
            localStorage.setItem('refresh_token', action.userInfo.refreshToken);

            return {
                ...state,
                isLoggedIn: true,
                userInfo: getUserInfoByAccessToken(localStorage.getItem('access_token')),
                accessToken: action.userInfo.access_token,
                refreshToken: action.userInfo.refresh_token,
            };

        case actionTypes.PROCESS_LOGOUT:
            localStorage.setItem('isLoggedIn', false);
            localStorage.setItem('access_token', '');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('cart')
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
                accessToken: null,
                refreshToken: null,
            };
        default:
            return state;
    }
};

export default userReducer;
