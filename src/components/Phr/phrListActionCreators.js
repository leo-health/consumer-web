import fetch from 'isomorphic-fetch';
import URI from 'urijs';
import * as Constants from '../../config/constants';

export const PhrListActionTypes = {
  FETCH_PHRS_REQUEST: 'FETCH_PHRS_REQUEST',
  FETCH_PHRS_REQUEST_SUCCESS: 'FETCH_PHRS_REQUEST_SUCCESS',
  FETCH_PHRS_REQUEST_FAIL: 'FETCH_PHRS_REQUEST_FAIL',
  POST_NOTE_REQUEST: 'POST_NOTE_REQUEST',
  POST_NOTE_REQUEST_SUCCESS: 'POST_NOTE_REQUEST_SUCCESS',
  POST_NOTE_REQUEST_FAIL: 'POST_NOTE_REQUEST_FAIL',
  FETCH_NOTE_REQUEST: 'GET_NOTE_REQUEST',
  FETCH_NOTE_REQUEST_SUCCESS: 'FETCH_NOTE_REQUEST_SUCCESS',
  FETCH_NOTE_REQUEST_FAIL: 'FETCH_NOTE_REQUEST_FAIL'
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
    var uri = `${base}/patients/${params.id}/phr?authentication_token=${auth}`;
    return fetch(uri, {method: "get"})
    .then(response => response.json())
    .then(json => dispatch(responseSuccessOrFail(json.data, fetchPhrsRequestSuccess, fetchPhrsRequestFail)))
  }
}

export function postNoteRequest() {
  return {
    type: PhrListActionTypes.POST_NOTE_REQUEST
  };
}

export function postNoteRequestSuccess() {
  return {
    type: PhrListActionTypes.POST_NOTE_REQUEST_SUCCESS
  };
}

export function postNoteRequestFail() {
  return {
    type: PhrListActionTypes.POST_NOTE_REQUEST_FAIL
  };
}

export function postNoteAsync(params){
  return (dispatch, getState) => {
    dispatch(fetchPhrsRequest());
    var base = Constants.API_BASE_URL;
    var auth = getState().getIn(["authentication","token"]);
    var uri = `${base}/patients/${params.id}/notes?authentication_token=${auth}&note=${params.note}`;
    return fetch(uri, {method: "post"})
    .then(response => response.json())
    .then(json => dispatch(responseSuccessOrFail(json.data, postNoteRequestSuccess, postNoteRequestFail)))
  }
}

export function fetchNoteRequest() {
  return {
    type: PhrListActionTypes.FETCH_NOTE_REQUEST
  };
}

export function fetchNoteRequestSuccess(payload) {
  return {
    type: PhrListActionTypes.FETCH_NOTE_REQUEST_SUCCESS,
    notes: payload.notes
  }
}

export function fetchNoteRequestFail() {
  return {
    type: PhrListActionTypes.FETCH_NOTE_REQUEST_FAIL
  };
}

export function fetchNoteAsync(params){
  return (dispatch, getState) => {
    dispatch(fetchPhrsRequest());
    var base = Constants.API_BASE_URL;
    var auth = getState().getIn(["authentication","token"]);
    var uri = `${base}/patients/${params.id}/notes?authentication_token=${auth}`;
    return fetch(uri, {method: "get"})
        .then(response => response.json())
        .then(json => dispatch(responseSuccessOrFail(json.data, fetchNoteRequestSuccess, fetchNoteRequestFail)))
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
