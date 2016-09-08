import {fromJS, Map} from 'immutable';
import {ActionTypes} from '../actions/action_creators';
import {PatientListActionTypes} from '../actions/patient_list_action_creators';
import {AppointmentTypeListActionTypes} from '../actions/appointment_type_list_action_creators';
import {combineReducers} from 'redux-immutable';

import {
  selectObject,
  requestObjects,
  receiveObjects
} from './object_list_reducers.js';

function schedulingAppointmentType(state = Map(), action) {
  switch (action.type) {
    case AppointmentTypeListActionTypes.SELECT_APPOINTMENT_TYPE:
      return selectObject(state, action.payload.selectedObjectID);
    case AppointmentTypeListActionTypes.REQUEST_APPOINTMENT_TYPE:
      return requestObjects(state);
    case AppointmentTypeListActionTypes.RECEIVE_APPOINTMENT_TYPE:
      return receiveObjects(state, action.payload.objectList);
  }
  return state;
}

function schedulingPatient(state = Map(), action) {
  switch (action.type) {
    case PatientListActionTypes.SELECT_PATIENT:
      return selectObject(state, action.payload.selectedObjectID);
    case PatientListActionTypes.REQUEST_PATIENTS:
      return requestObjects(state);
    case PatientListActionTypes.RECEIVE_PATIENTS:
      return receiveObjects(state, action.payload.objectList);
  }
  return state;
}

function schedulingSlot(state = Map(), action) {
  switch (action.type) {
    case PatientListActionTypes.SELECT_SLOT:
      return selectObject(state, action.payload.selectedObjectID);
    case PatientListActionTypes.REQUEST_SLOTS:
      return requestObjects(state);
    case PatientListActionTypes.RECEIVE_SLOTS:
      return receiveObjects(state, action.payload.objectList);
  }
  return state;
}

export default combineReducers({
  schedulingPatient,
  schedulingSlot,
  schedulingAppointmentType
});
