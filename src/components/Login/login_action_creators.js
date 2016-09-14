import fetch from 'isomorphic-fetch';
import URI from 'urijs';
import * as Constants from '../../config/constants';

export const LoginActionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL'
}

export function loginRequest() {
  return {
    type: LoginActionTypes.LOGIN_REQUEST
  };
}

export function loginSuccess(payload) {
  return {
    type: LoginActionTypes.LOGIN_SUCCESS,
    session: payload.data.session,
    user: payload.data.user,
  };
}

export function loginFail(error) {
  return {
    type: LoginActionTypes.LOGIN_FAIL,
    error
  };
}

// TODO: find the right place for utility functions like this
// TODO: standardize api functions
function responseSuccessOrFail(json, successActionCreator, failActionCreator) {
  if (!json || json.status === "error") {
    if (failActionCreator) {
      return failActionCreator(json);
    }
  }
  if (successActionCreator) {
    return successActionCreator(json);
  }
}

export function submitLoginAsync(email, password) {
  return (dispatch, getState) => {
    dispatch(loginRequest())

    const uri = URI(Constants.API_BASE_URL)
    .segment("login")
    .query({email, password});

    return fetch(uri, {method: "post"})
    .then(response => response.json())
    .then(json => dispatch(responseSuccessOrFail(json, loginSuccess, loginFail)));
  };
}
