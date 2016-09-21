import {fromJS, Map} from 'immutable';
import {LoginActionTypes} from '../../components/Login/login_action_creators';
import {SettingsActionTypes} from '../../components/Settings/settings_action_creators';
import localStorageHelper from '../../utils/localStorageHelper';

function loginRequest(state, action) {
  debugger
  return state.set("isLoading", true);
}

function loginSuccess(state, action) {
  return setAuthToken(state, action.session.authentication_token)
  .set("current_user", fromJS(action.user)) // TODO: determine if we need to cache the user to localStorage or not
  .set("isLoading", false);
}

function loginFail(state, action) {
  return Map() // clear state on failed login
  .set("apiError", fromJS(action.error))
  .set("isLoading", false);
}

function logoutRequest(state, action) {
  localStorageHelper.clearCachedAuthToken();
  // TODO: This should probably clear the entire state, not just the authentication subtree
  return Map();
}

function loadCachedAuthToken(state, action) {
  return setAuthToken(state, localStorageHelper.getCachedAuthToken());
}

function setAuthToken(state, token) {
  localStorageHelper.setCachedAuthToken(token);
  return state.set("token", token);
}

export function authentication(state = Map(), action) {
  switch (action.type) {
    case SettingsActionTypes.LOGOUT_REQUEST:
      return logoutRequest(state, action);
    case LoginActionTypes.LOAD_CACHED_AUTH_TOKEN:
      return loadCachedAuthToken(state, action);
    case LoginActionTypes.LOGIN_REQUEST:
      return loginRequest(state, action);
    case LoginActionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case LoginActionTypes.LOGIN_FAIL:
      return loginFail(state, action);
  }
  return state;
}
