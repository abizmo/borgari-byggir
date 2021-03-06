import * as actionTypes from '../actions/actionTypes';

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};

const authStart = (state) => {
  return {
    ...state,
    error: null,
    loading: true
  }
};

const authSuccess = (state, action) => {
  return {
    ...state,
    idToken: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const authLogout = (state) => {
  return {
    ...state,
    idToken: null,
    userId: null,
    error: null,
    loading: false
  };
};

const setAuthRedirectPath = (state, action) => {
  return {
    ...state,
    authRedirectPath: action.path
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
