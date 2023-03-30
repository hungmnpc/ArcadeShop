import { createContext, useReducer } from 'react';
import userReducer from '../store/reduces/userReducer';
import { initialState } from '../store/reduces/userReducer';

export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [userState, dispatch] = useReducer(userReducer, initialState);

    return <AuthContext.Provider value={[userState, dispatch]}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
