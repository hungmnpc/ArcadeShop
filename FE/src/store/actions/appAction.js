import actionTypes from './actionTypes';

export const pushHistory = (path) => ({
    type: actionTypes.PUSH_HISTORY,
    path: path
}) 

export const popHistory = () => ({
    type: actionTypes.POP_HISTORY,
})