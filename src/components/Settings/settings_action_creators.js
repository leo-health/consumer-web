import fetch from 'isomorphic-fetch';
import URI from 'urijs';
import * as Constants from '../../config/constants';

export const SettingsActionTypes = {
  LOGOUT_REQUEST: 'LOGOUT_REQUEST'
};

function logoutRequest() {
  return {
    type: SettingsActionTypes.LOGOUT_REQUEST
  };
}

export function logoutAsync() {
  return (dispatch, getState) => {
    const authentication_token = getState().getIn(["authentication", "token"]);

    dispatch(logoutRequest());

    const uri = URI(Constants.API_BASE_URL)
    .segment("logout")
    .query({authentication_token});

    return fetch(uri, {method: "delete"});
  }
}
