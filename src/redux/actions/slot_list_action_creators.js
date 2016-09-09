import fetch from 'isomorphic-fetch';
import * as Constants from '../../config/constants';
import moment from 'moment';
import URI from 'urijs';

export const SlotListActionTypes = {
  REQUEST_SLOTS: 'REQUEST_SLOTS',
  RECEIVE_SLOTS: 'RECEIVE_SLOTS',
  FETCH_SLOTS: 'FETCH_SLOTS',
  SELECT_SLOT: 'SELECT_SLOT'
}

export function selectSlot(selectedObjectID) {
  return {
    type: SlotListActionTypes.SELECT_SLOT,
    payload: {selectedObjectID}
  };
}

export function requestSlots() {
  return {
    type: SlotListActionTypes.REQUEST_SLOTS
  };
}

export function receiveSlots(objectList) {
  return {
    type: SlotListActionTypes.RECEIVE_SLOTS,
    payload: {
      objectList: objectList.map(slot => {
        return {...slot, id: slot.start_datetime}
      })
    }
  };
}

// this promise.catch function is useless, something is going wrong here. reason is json read error, not the api error response
// const temporaryErrorHandler = (scenario) => (reason) => {
//   console.log(`${scenario} - Caught error! ${reason}`);
// }

export function fetchSlots(appointment_type_id) {
  return function (dispatch) {
    dispatch(requestSlots())

    const authentication_token = Constants.HARD_CODED_AUTH_TOKEN;
    const start_date = moment()
    const end_date = start_date.add(6, "months");

    const uri = URI(Constants.API_BASE_URL)
    .segment("appointment_slots") // NOTE: This is a weird method name for appendToPath()
    .query({
      authentication_token,
      appointment_type_id,
      start_date: start_date.format(Constants.API_DATE_FORMAT),
      end_date: end_date.format(Constants.API_DATE_FORMAT)
    });

    return fetch(uri)
    .then(response => response.json())
    .then(json => {
      dispatch(receiveSlots(json.data[0].slots))
    });
  }
}
