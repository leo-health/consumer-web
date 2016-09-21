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

export const getAllEntities = (state, type) => {
  const entityMap = state.getIn(["entities", type]);
  if (!entityMap) {
    return undefined;
  }
  return entityMap.valueSeq().toList();
};

export const getById = (state, type, id) => {
  const allEntities = getEntities(state, type);
  if (!allEntities) { return undefined; } // return null?
  return allEntities.get("id");
};

export const getAllSlotsSorted = (state) => {
  const allSlots = getAllEntities(state, "slots");
  if (!allSlots) {
    return undefined;
  }
  return allSlots.sort();
}

export const slotsByDate = (slots) => {
  return slots
  .reduce((map, slot) => {

    // get the date of the slot
    const date = moment(slot.get('start_datetime')).startOf("day").format();
    if (!date) {
      console.log(`start_datetime undefined...  ${slot}`);
      return map;
    }

    // append the slot to the list of slots for that date
    const slotList = map.get(date) || [];
    slotList.push(slot);
    return map.set(date, slotList);
  }, Map().asMutable())
  .sort()
  .asImmutable();
};
