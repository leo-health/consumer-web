import {fromJS, Map, List} from 'immutable';
import {PatientListActionTypes} from '../actions/patient_list_action_creators';
import {SlotListActionTypes} from '../actions/slot_list_action_creators';
import {AppointmentTypeListActionTypes} from '../actions/appointment_type_list_action_creators';

import moment from 'moment';
import {DATE_FORMATS} from '../../config/constants';

// ????: should selectors be in a separate file? or with the reducers?
import * as entitiesSelectors from '../selectors/entities_selectors';


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

export default function entities(state = Map(), action) {
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


// selectors

export const getAllEntitiesMap = (state, type) => {
  return state.getIn(["entities", type]);
}

export const getAllEntitiesList = (state, type) => {
  const entityMap = getAllEntitiesMap
  if (!entityMap) {
    return undefined;
  }
  return entityMap.valueSeq().toList();
};

export const getById = (state, type, id) => {
  const allEntities = getAllEntitiesMap(state, type);
  if (!allEntities) { return undefined; } // return null?
  return allEntities.get(id);
};
