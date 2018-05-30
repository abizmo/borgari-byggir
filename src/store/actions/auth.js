import axios from 'axios';
import * as actionTypes from './actionTypes';
const API_KEY = 'AIzaSyA4uuBRCtoIRVe1l2RJt84Qah1UG4jl-Mo';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkExpiredToken = (expireTime) => {
  return dispatch => {
    setTimeout(() => dispatch(logout()), expireTime * 1000);
  };
};

export const auth = (email, password, isSingUp) => {
  return dispatch => {
    dispatch(authStart());
    const endPoint = isSingUp ? "signupNewUser" : "verifyPassword";
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${endPoint}?key=${API_KEY}`;
    const payload = {
      email,
      password,
      returnSecureToken: true
    };

    axios.post(url, payload)
      .then(res => {
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkExpiredToken(res.data.expiresIn));
      })
      .catch(err => dispatch(authFail(err)));
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};
