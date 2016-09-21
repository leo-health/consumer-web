import fetch from 'isomorphic-fetch';
import URI from 'urijs';
import * as Constants from '../../config/constants';

export const PhrListActionTypes = {
  FETCH_PHRS_REQUEST: 'FETCH_PHRS_REQUEST',
  FETCH_PHRS_REQUEST_SUCCESS: 'FETCH_PHRS_REQUEST_SUCCESS',
  FETCH_PHRS_REQUEST_FAIL: 'FETCH_PHRS_REQUEST_FAIL'
};

export function fetchPhrsRequest() {
  return {
    type: PhrListActionTypes.FETCH_PHRS_REQUEST
  };
}

export function fetchPhrsRequestSuccess(payload){
  return {
    type: LoginActionTypes.FETCH_PHRS_REQUEST_SUCCESS
  };
}

export function fetchPhrsRequestFail(error) {
  return {
    type: LoginActionTypes.LOGIN_FAIL,
    error
  }
}

export function fetchPhrsAsync(params) {
  return (dispatch, getState) => {
    dispatch(fetchPhrsRequest());
    const base = Constants.API_BASE_URL;
    const auth = getState().getIn(["authentication","token"]);
    return fetch(`${base}/patients/${params.id}/phr?authentication_token=${auth}`)
    .then(response => response.json())
    .then(json => dispatch(responseSuccessOrFail(json.data)))
  }
}

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
