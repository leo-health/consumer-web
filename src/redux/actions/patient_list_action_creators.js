import fetch from 'isomorphic-fetch';
import * as Constants from '../../config/constants';

// TODO: pull out generic code, avoid find/replace, copy/paste

export const PatientListActionTypes = {
  REQUEST_PATIENTS: 'REQUEST_PATIENTS',
  RECEIVE_PATIENTS: 'RECEIVE_PATIENTS',
  FETCH_PATIENTS: 'FETCH_PATIENTS',
  SELECT_PATIENT: 'SELECT_PATIENT'
}

/*
 TODO: ARCHITECTURE: Explore ways to separate actions/state that come from the server vs state that is only relevant locally
 For example, selectAppointmentType is related to local user activity, but requestObjects/receiveObjects is API related
 */

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

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    dispatch(requestPatients())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.


    // TODO: remove hard coding
    const authentication_token = "Tem43-tfYgj_vNaxZ3WL";

    // TODO: abstract api requests into separate file

    return fetch(`${Constants.API_BASE_URL}/family?authentication_token=${authentication_token}`)
      .then(response => response.json())
      .then(json => dispatch(receivePatients(json.data.family.patients)))
      .catch(temporaryErrorHandler("generic"));
  }
}
