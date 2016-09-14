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

export function selectAppointmentType(appointmentType) {
  return {
    type: AppointmentTypeListActionTypes.SELECT_APPOINTMENT_TYPE,
    payload: {appointmentType}
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
  return function (dispatch, getState) {
    dispatch(requestAppointmentTypes())
    const base = Constants.API_BASE_URL;
    const auth = getState().getIn(["authentication","token"]);
    return fetch(`${base}/appointment_types?authentication_token=${auth}`)
      .then(response => response.json())
      .then(json => dispatch(receiveAppointmentTypes(json.data)))
      .catch(temporaryErrorHandler("generic"));
  }
}
