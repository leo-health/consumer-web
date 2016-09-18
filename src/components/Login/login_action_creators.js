import fetch from 'isomorphic-fetch';
import URI from 'urijs';
import * as Constants from '../../config/constants';

export const LoginActionTypes = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOAD_CACHED_AUTH_TOKEN: 'LOAD_CACHED_AUTH_TOKEN'
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

// NOTE: this one may belong in a separate file, if we are using these "modules" to represent only actions triggered by user activity
// this one is automatic
// this is also the reason why logout is in settings_action_creators instead of here. Maybe authentication should be app-wide instead of module specific
export function loadCachedAuthToken() {
  return {
    type: LoginActionTypes.LOAD_CACHED_AUTH_TOKEN
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
