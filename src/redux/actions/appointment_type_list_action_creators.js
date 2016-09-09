import fetch from 'isomorphic-fetch';
import * as Constants from '../../config/constants';

// TODO: pull out generic code, avoid find/replace, copy/paste

export const AppointmentTypeListActionTypes = {
  REQUEST_APPOINTMENT_TYPE: 'REQUEST_APPOINTMENT_TYPE',
  RECEIVE_APPOINTMENT_TYPE: 'RECEIVE_APPOINTMENT_TYPE',
  FETCH_APPOINTMENT_TYPE: 'FETCH_APPOINTMENT_TYPE',
  SELECT_APPOINTMENT_TYPE: 'SELECT_APPOINTMENT_TYPE'
}

/*
 TODO: ARCHITECTURE: Explore ways to separate actions/state that come from the server vs state that is only relevant locally
 For example, selectAppointmentType is related to local user activity, but requestObjects/receiveObjects is an API response
 */

export function selectAppointmentType(selectedObjectID) {
  return {
    type: AppointmentTypeListActionTypes.SELECT_APPOINTMENT_TYPE,
    payload: {selectedObjectID}
  };
}

export function requestAppointmentTypes() {
  return {
    type: AppointmentTypeListActionTypes.REQUEST_APPOINTMENT_TYPE
  };
}

export function receiveAppointmentTypes(objectList) {
  return {
    type: AppointmentTypeListActionTypes.RECEIVE_APPOINTMENT_TYPE,
    payload: {objectList}
  };
}

const temporaryErrorHandler = (scenario) => (reason) => {
  console.log(`${scenario} - Caught error! ${reason}`);
}

export function fetchAppointmentTypes() {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    dispatch(requestAppointmentTypes())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    // TODO: abstract api requests into separate file

    const base = Constants.API_BASE_URL;
    const auth = Constants.HARD_CODED_AUTH_TOKEN;
    return fetch(`${base}/appointment_types?authentication_token=${auth}`)
      .then(response => response.json())
      .then(json => dispatch(receiveAppointmentTypes(json.data)))
      .catch(temporaryErrorHandler("generic"));
  }
}
