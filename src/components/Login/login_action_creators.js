import fetch from 'isomorphic-fetch';
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
    payload
  };
}

export function loginFail(error) {
  return {
    type: LoginActionTypes.LOGIN_FAIL,
    error
  };
}



function loginRequestSelector(state) {
  const authState = state.get("authentication");
  return {
    email: authState.get("email"),
    password: authState.get("password")
  };
}

// TODO: find the right place for utility functions like this
// TODO: standardize api functions
function responseSuccessOrFail(json, successActionCreator, failActionCreator) {
  if (json.status === "error") {
    return failActionCreator(json);
  }
  return successActionCreator(json);
}

export function submitLoginAsync() {
  return (dispatch, getState) => {
    dispatch(loginRequest())

    const params = loginRequestSelector(getState());
    const uri = URI(Constants.API_BASE_URL)
    .segment("login")
    .query(params);

    return fetch(uri, {method: "post"})
    .then(response => response.json())
    .then(json => dispatch(responseSuccessOrFail(json, loginSuccess, loginFail)));
  };
}
