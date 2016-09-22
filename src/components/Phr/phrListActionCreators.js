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
    type: PhrListActionTypes.FETCH_PHRS_REQUEST_SUCCESS,
    allergies: payload.allergies,
    medications: payload.medications,
    immunizations: payload.immunizations,
    heights: payload.heights,
    weights: payload.weights,
    bmis: payload.bmis
  };
}

export function fetchPhrsRequestFail(error) {
  return {
    type: PhrListActionTypes.FETCH_PHRS_REQUEST_FAIL,
    error
  }
}

export function fetchPhrsAsync(params) {
  return (dispatch, getState) => {
    dispatch(fetchPhrsRequest());
    var base = Constants.API_BASE_URL;
    var auth = getState().getIn(["authentication","token"]);
    var uri = `${base}/patients/${params.id}/phr?authentication_token=${auth}`
    return fetch(uri, {method: "get"})
    .then(response => response.json())
    .then(json => dispatch(responseSuccessOrFail(json.data, fetchPhrsRequestSuccess, fetchPhrsRequestFail)))
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
