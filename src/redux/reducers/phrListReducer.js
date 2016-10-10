import {fromJS, Map} from 'immutable';
import {PhrListActionTypes} from '../../components/Phr/phrListActionCreators';

function fetchPhrRequest(state, action) {
  return state.set("isLoading", true);
}

function fetchPhrRequestSuccess(state, action) {
  return state.set('allergies', action.allergies)
  .set('medications', action.medications)
  .set('immunizations', action.immunizations)
  .set('heights', action.heights)
  .set('weights', action.weights)
  .set('bmis', action.bmis)
}

function fetchPhrRequestFail(state, action) {
 return state;
}

export function phrList(state = Map(), action) {
  switch (action.type) {
    case PhrListActionTypes.FETCH_PHRS_REQUEST:
      return fetchPhrRequest(state, action);
    case PhrListActionTypes.FETCH_PHRS_REQUEST_SUCCESS:
      return fetchPhrRequestSuccess(state, action);
    case PhrListActionTypes.FETCH_PHRS_REQUEST_FAIL:
      return fetchPhrRequestFail(state, action);
    default:
      return state;
  }
}


function fetchPatientNoteRequest(state, action) {
  return state.set("isLoading", true);
}

function fetchPatientNoteRequestSuccess(state, action) {
  return state.set('notes', action.notes)
}

function fetchPatientNoteRequestFail(state, action) {
  debugger;
}

export function patientNote(state = Map(), action) {
  switch (action.type) {
    case PhrListActionTypes.FETCH_NOTE_REQUEST:
      return fetchPatientNoteRequest(state, action);
    case PhrListActionTypes.FETCH_NOTE_REQUEST_SUCCESS:
      return fetchPatientNoteRequestSuccess(state, action);
    case PhrListActionTypes.FETCH_NOTE_REQUEST_FAIL:
      return fetchPatientNoteRequestFail(state, action);
    default:
      return state;
  }
}

function fetchPdfRequest(state, action) {
  return state.set("isLoading", true);
}

function fetchPdfRequestSuccess(state, action) {
  return state.set('pdf', action.pdf)
}

function fetchPdfRequestFail(state, action) {
  debugger
}

export function immunizationPdf(state = Map(), action) {
  switch (action.type) {
    case PhrListActionTypes.FETCH_PDF_REQUEST:
      return fetchPdfRequest(state, action);
    case PhrListActionTypes.FETCH_PDF_REQUEST_SUCCESS:
      return fetchPdfRequestSuccess(state, action);
    case PhrListActionTypes.FETCH_PDF_REQUEST_FAIL:
      return fetchPdfRequestFail(state, action);
    default:
      return state;
  }
}

