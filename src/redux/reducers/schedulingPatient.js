import {Map} from 'immutable';
import {PatientListActionTypes} from '../actions/patient_list_action_creators';
import {
  selectObject,
  requestObjects,
  receiveObjects,
  requestFailure
} from './object_list';

export default function schedulingPatient(state = Map(), action) {
  switch (action.type) {
    case PatientListActionTypes.SELECT_PATIENT:
      return selectObject(state, action.payload.patient.get("id"));
    case PatientListActionTypes.REQUEST_PATIENTS:
      return requestObjects(state);
    case PatientListActionTypes.PATIENT_REQUEST_SUCCESS:
      return receiveObjects(state, action.payload.objectList);
  }
  return state;
}
