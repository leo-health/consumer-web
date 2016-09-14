import {fromJS, Map} from 'immutable';
import {combineReducers} from 'redux-immutable';
import {LoginActionTypes} from '../../components/Login/login_action_creators';
import {SettingsActionTypes} from '../../components/Settings/settings_action_creators';

function loginRequest(state, action) {
  return state.set("isLoading", true);
}

function loginSuccess(state, action) {
  return state
  .set("token", action.session.authentication_token)
  .set("current_user", fromJS(action.user))
  .set("isLoading", false);
}

function loginFail(state, action) {
  return Map() // clear state on failed login
  .set("apiError", fromJS(action.error))
  .set("isLoading", false);
}

function logoutRequest(state, action) {
  // TODO: This should probably clear the entire state, not just the authentication subtree
  return Map();
}

export function authentication(state = Map(), action) {
  switch (action.type) {
    case SettingsActionTypes.LOGOUT_REQUEST:
      return logoutRequest(state, action);
    case LoginActionTypes.LOGIN_REQUEST:
      return loginRequest(state, action);
    case LoginActionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case LoginActionTypes.LOGIN_FAIL:
      return loginFail(state, action);
  }
  return state;
}
