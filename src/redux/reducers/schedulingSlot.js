import {Map, List, fromJS} from 'immutable';
import {SlotListActionTypes} from '../actions/slot_list_action_creators';
import {combineReducers} from 'redux-immutable';
import moment from 'moment';

const initialState = {
  // groupedSlotsByDate: Map(),
  selectedObjectID: null,
  selectedProviderID: null,
  apiError: null,
  isLoading: false
};

// function groupedSlotIDsByDate(state = initialState.groupedSlotsByDate, action) {
//   switch (action.type) {
//     case SlotListActionTypes.RECEIVE_SLOTS:
//
//     default:
//       return state;
//   }
// }

function selectedObjectID(state = initialState.selectedObjectID, action) {
  switch (action.type) {
    case SlotListActionTypes.SELECT_SLOT:
      return action.payload.slot.get("start_datetime");
    default:
      return state;
  }
}

function selectedProviderID(state = initialState.selectedProviderID, action) {
  switch (action.type) {
    case SlotListActionTypes.SELECT_SLOT:
      return action.payload.slot.get("provider_id");
    default:
      return state;
  }
}

function apiError(state = initialState.apiError, action) {
  switch (action.type) {
    case SlotListActionTypes.REQUEST_SLOTS:
      return null;
    case SlotListActionTypes.SLOT_REQUEST_FAILURE:
      return fromJS(action.payload.apiError);
    default:
      return state;
  }
}

function isLoading(state = initialState.isLoading, action) {
  switch (action.type) {
    case SlotListActionTypes.REQUEST_SLOTS:
      return true;
    case SlotListActionTypes.RECEIVE_SLOTS:
      return false;
    case SlotListActionTypes.SLOT_REQUEST_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  // groupedSlotIDsByDate,
  selectedObjectID,
  selectedProviderID,
  apiError,
  isLoading
});

// export const getGroupedSlotIDsByDate = state => state.get("groupedSlotIDsByDate");
