import {fromJS, Map} from 'immutable';
import {combineReducers} from 'redux-immutable';
import {PatientListActionTypes} from '../actions/patient_list_action_creators';
import {SlotListActionTypes} from '../actions/slot_list_action_creators';
import {AppointmentTypeListActionTypes} from '../actions/appointment_type_list_action_creators';
import {
  selectObject,
  requestObjects,
  receiveObjects,
  requestFailure
} from './object_list_reducers.js';

import {authentication} from '../../components/Login/authentication_reducer';


// TODO: http://redux.js.org/docs/recipes/ReducingBoilerplate.html


function schedulingAppointmentType(state = Map(), action) {
  switch (action.type) {
    case AppointmentTypeListActionTypes.SELECT_APPOINTMENT_TYPE:
      return selectObject(state, action.payload.appointmentType.get("id"));
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
      return selectObject(state, action.payload.patient.get("id"));
    case PatientListActionTypes.REQUEST_PATIENTS:
      return requestObjects(state);
    case PatientListActionTypes.RECEIVE_PATIENTS:
      return receiveObjects(state, action.payload.objectList);
  }
  return state;
}

function selectSlot(state, action) {
  return selectObject(state, action.payload.slot.get("id"))
  .set("selectedProviderID", action.payload.slot.get("provider_id"));
}

function schedulingSlot(state = Map(), action) {
  switch (action.type) {
    case SlotListActionTypes.SELECT_SLOT:
      return selectSlot(state, action);
    case SlotListActionTypes.REQUEST_SLOTS:
      return requestObjects(state);
    case SlotListActionTypes.RECEIVE_SLOTS:
      return receiveObjects(state, action.payload.objectList);
    case SlotListActionTypes.SLOT_REQUEST_FAILURE:
      return requestFailure(state, action.payload.apiError);
  }
  return state;
}

export default combineReducers({
  authentication,
  schedulingPatient,
  schedulingSlot,
  schedulingAppointmentType
});
