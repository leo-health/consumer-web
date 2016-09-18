import {fromJS, Map} from 'immutable';
import {PatientListActionTypes} from '../actions/patient_list_action_creators';
import {SlotListActionTypes} from '../actions/slot_list_action_creators';
import {AppointmentTypeListActionTypes} from '../actions/appointment_type_list_action_creators';

// TODO: reduce boilerplate with https://github.com/acdlite/redux-actions

function mergeEntities(state, key, objectList) {

  // TODO: merge, not replace
  // TODO: clean up the idMap parsing. https://github.com/paularmstrong/normalizr
  return state.set(key, objectList.reduce((idMap, nextObject)=>{
    if (nextObject.get && nextObject.get("id")) {
      return idMap.set(nextObject.get("id"), nextObject);
    }
  }, Map()));
}

export function entities(state = Map(), action) {
  switch (action.type) {
    case PatientListActionTypes.PATIENT_REQUEST_SUCCESS:
      return mergeEntities(state, "patients", fromJS(action.payload.objectList));
    case AppointmentTypeListActionTypes.RECEIVE_APPOINTMENT_TYPE:
      return mergeEntities(state, "appointment_types", fromJS(action.payload.objectList));
    case SlotListActionTypes.RECEIVE_SLOTS:
      return mergeEntities(state, "slots", fromJS(action.payload.objectList));
    default:
      return state;
  }
}
