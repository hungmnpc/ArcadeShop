import { createContext, useEffect, useReducer } from 'react';
import appReducer, { appInitialState } from '../store/reduces/appReducer';
import { useLocation } from 'react-router-dom';
import { pushHistory } from '../store/actions/appAction';
import { createBrowserHistory } from 'history';

export const AppContext = createContext();
function AppProvider({ children }) {
    const [appState, dispatch] = useReducer(appReducer, appInitialState);

    const history = createBrowserHistory();

    return <AppContext.Provider value={[appState, dispatch, history]}>{children}</AppContext.Provider>;
}

export default AppProvider;
