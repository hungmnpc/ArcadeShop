import { createContext, useReducer } from 'react';
import appReducer, { appInitialState } from '../store/reduces/appReducer';

export const AppContext = createContext();
function AppProvider({ children }) {
    const [appState, dispatch] = useReducer(appReducer, appInitialState);

    return <AppContext.Provider value={[appState, dispatch]}>{children}</AppContext.Provider>;
}

export default AppProvider;
