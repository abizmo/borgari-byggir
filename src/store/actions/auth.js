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
  localStorage.removeItem('bb-token');
  localStorage.removeItem('bb-user');
  localStorage.removeItem('bb-expirationDate');
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
        localStorage.setItem('bb-token', res.data.idToken);
        localStorage.setItem('bb-user', res.data.localId);
        const expirationDate = new Date (new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('bb-expirationDate', expirationDate);
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

export const tryAutoAuthentication = () => {
  return dispatch => {
    const token = localStorage.getItem('bb-token');
    if (!token)
      return dispatch(logout());
    const expirationDate = new Date(localStorage.getItem('bb-expirationDate')).getTime();
    const expiresIn = (expirationDate - new Date().getTime()) / 1000;
    if (expiresIn <= 0)
      return dispatch(logout());
    const userId = localStorage.getItem('bb-user');
    dispatch(authSuccess(token, userId));
    dispatch(checkExpiredToken(expiresIn));
  };
};
