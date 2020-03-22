import Axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = error => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => dispatch => {
    setTimeout(() =>{
        dispatch(logout());
    }, expirationTime * 1000);
}

export const auth = (email, password, isSingup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = isSingup ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPmxrXOma_qa7Fb32DC4ULzLpsqXmd2RA' 
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPmxrXOma_qa7Fb32DC4ULzLpsqXmd2RA';

        Axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error.response.data.error));
            })
    }
}