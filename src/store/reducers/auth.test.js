import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('Auth reducer', () => {
  it('it should return the initial state', () => {
    const action = { type: actionTypes.AUTH_START };
    expect(reducer(undefined, {})).toEqual({
      idToken: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
  it('it should store the token upon login', () => {
    expect(reducer({
      idToken: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    }, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: "mitoken",
      userId: "miuserid"
    })).toEqual({
      idToken: "mitoken",
      userId: "miuserid",
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
});
