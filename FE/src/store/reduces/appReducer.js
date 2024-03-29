import actionTypes from '../actions/actionTypes';

export const appInitialState = {
    account: localStorage.getItem('account') || { email: '', password: '' },
    isRemember: localStorage.getItem('isRemember') || false,
    historyPath: []
};

const rememberAccount = (account, state) => {
    localStorage.setItem('account', JSON.stringify(account));
    localStorage.setItem('isRemember', true);
    return {
        ...state,
        account: account,
        isRemember: true,
    };
};

const appReducer = (state = appInitialState, action) => {
    switch (action.type) {
        case actionTypes.REMEMBER_ACCOUNT:
            console.log(action.account);
            console.log(action);

            return rememberAccount(action.account, state);

        case actionTypes.PUSH_HISTORY:
            return {
                ...state,
                historyPath: state.historyPath.push(action.path)
            }
        case actionTypes.POP_HISTORY:

            state.historyPath.pop();
            return {
                ...state,
                historyPath: state.historyPath
            }
        
        default:
            return state;
    }
};


export default appReducer;
