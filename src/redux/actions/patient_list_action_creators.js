import fetch from 'isomorphic-fetch';
import * as Constants from '../../config/constants';

export const PatientListActionTypes = {
  REQUEST_PATIENTS: 'REQUEST_PATIENTS',
  RECEIVE_PATIENTS: 'RECEIVE_PATIENTS',
  FETCH_PATIENTS: 'FETCH_PATIENTS',
  SELECT_PATIENT: 'SELECT_PATIENT'
}

export function selectPatient(selectedObjectID) {
  return {
    type: PatientListActionTypes.SELECT_PATIENT,
    payload: {selectedObjectID}
  };
}

export function requestPatients() {
  return {
    type: PatientListActionTypes.REQUEST_PATIENTS
  };
}

export function receivePatients(objectList) {
  return {
    type: PatientListActionTypes.RECEIVE_PATIENTS,
    payload: {objectList}
  };
}


const temporaryErrorHandler = (scenario) => (reason) => {
  console.log(`${scenario} - Caught error! ${reason}`);
}

export function fetchPatients() {
  return function (dispatch) {
    dispatch(requestPatients())
    const base = Constants.API_BASE_URL;
    const auth = Constants.HARD_CODED_AUTH_TOKEN;
    return fetch(`${base}/family?authentication_token=${auth}`)
      .then(response => response.json())
      .then(json => dispatch(receivePatients(json.data.family.patients)))
      .catch(temporaryErrorHandler("GET /patients"));
  }
}
