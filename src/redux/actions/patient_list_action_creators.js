import fetch from 'isomorphic-fetch';
import * as Constants from '../../config/constants';

export const PatientListActionTypes = {
  REQUEST_PATIENTS: 'REQUEST_PATIENTS',
  PATIENT_REQUEST_SUCCESS: 'PATIENT_REQUEST_SUCCESS',
  SELECT_PATIENT: 'SELECT_PATIENT'
}

export function selectPatient(patient) {
  return {
    type: PatientListActionTypes.SELECT_PATIENT,
    payload: {patient}
  };
}

export function requestPatients() {
  return {
    type: PatientListActionTypes.REQUEST_PATIENTS
  };
}

export function receivePatients(objectList) {
  return {
    type: PatientListActionTypes.PATIENT_REQUEST_SUCCESS,
    payload: {objectList}
  };
}


const temporaryErrorHandler = (scenario) => (reason) => {
  console.log(`${scenario} - Caught error! ${reason}`);
}

export function fetchPatients() {
  return function (dispatch, getState) {
    dispatch(requestPatients())
    const base = Constants.API_BASE_URL;
    const auth = getState().getIn(["authentication","token"]);
    return fetch(`${base}/family?authentication_token=${auth}`)
      .then(response => response.json())
      .then(json => dispatch(receivePatients(json.data.family.patients)))
      .catch(temporaryErrorHandler("GET /patients"));
  }
}
