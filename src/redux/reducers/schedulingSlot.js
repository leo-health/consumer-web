import {Map} from 'immutable';
import {SlotListActionTypes} from '../actions/slot_list_action_creators';
import {
  selectObject,
  requestObjects,
  receiveObjects,
  requestFailure
} from './object_list';

export default function schedulingSlot(state = Map(), action) {
  switch (action.type) {
    case SlotListActionTypes.FILTER_SLOTS:
      return state.set("filterDate", action.payload.filterDate);
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

// ????: should this reducer have a switch statement? initial state? default return?
function selectSlot(state, action) {
  return selectObject(state, action.payload.slot.get("id"))
  .set("selectedProviderID", action.payload.slot.get("provider_id"));
}
