import fetch from 'isomorphic-fetch';
import * as Constants from '../../config/constants';
import moment from 'moment';
import URI from 'urijs';

export const SlotListActionTypes = {
  REQUEST_SLOTS: 'REQUEST_SLOTS',
  RECEIVE_SLOTS: 'RECEIVE_SLOTS',
  SELECT_SLOT: 'SELECT_SLOT',
  SLOT_REQUEST_FAILURE: 'SLOT_REQUEST_FAILURE'
}

export function selectSlot(slot) {
  return {
    type: SlotListActionTypes.SELECT_SLOT,
    payload: {slot}
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
    payload: {objectList}
  };
}


export function slotRequestFailure(apiError) {
  return {
    type: SlotListActionTypes.SLOT_REQUEST_FAILURE,
    payload: {apiError}
  };
}

function slotResponseSuccessOrError(json) {

  // TODO: abstract this error checking away into function responseIsError(json)
  if (json.status === "error") {
    return slotRequestFailure(json);
  }

  const flatSlots = flattenSlots(json.data);
  const dedupedSlots = randomlyUniqueByTimeSlots(flatSlots);
  return receiveSlots(dedupedSlots);
}

function flattenSlots(provider_nested_slots) {
  // TODO: update backend to return this simpler, flat api response
  return provider_nested_slots.reduce((all_slots, provider_slots)=>{
    return [...all_slots, ...provider_slots.slots.map((slot)=>{
      return {
        id: slot.start_datetime,
        provider_id: provider_slots.provider_id,
        ...slot
      };
    })];
  }, []);
}

function randomlyUniqueByTimeSlots(slots) {
  const dedupedSlots = {};
  for (var i = 0; i < slots.length; i++) {
    const value = slots[i];
    const key = value.start_datetime;

    const valueNotYetSet = !dedupedSlots.hasOwnProperty(key);
    const shouldReplaceExistingValue = Math.random()<.5;
    const shouldSetUniqueValue = valueNotYetSet || shouldReplaceExistingValue;
    if (shouldSetUniqueValue) {
      dedupedSlots[key] = value;
    }
  }

  const arrayDeduped = [];
  for (var key in dedupedSlots) {
    if (dedupedSlots.hasOwnProperty(key)) {
      arrayDeduped.push(dedupedSlots[key]);
    }
  }
  return arrayDeduped;
}

export function fetchSlots(appointment_type_id) {
  return function (dispatch, getState) {
    dispatch(requestSlots())

    const authentication_token = getState().getIn(["authentication","token"]);
    const start_date = moment();
    const end_date = start_date.clone().add(6, "months");

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
    .then(json => dispatch(slotResponseSuccessOrError(json)));
  }
}
