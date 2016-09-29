import {fromJS, Map} from 'immutable';
import {PhrListActionTypes} from '../../components/Phr/phrListActionCreators';

function fetchPhrRequest(state, action) {
  return state.set("isLoading", true);
}

function fetchPhrRequestSuccess(state, action) {
  return state.set('allergies', action.allergies)
  .set('medications', action.medications)
  .set('immunizations', action.immunizations)
  .set('heights', action.heights)
  .set('weights', action.weights)
  .set('bmis', action.bmis)
}

function fetchPhrRequestFail(state, action) {
 return state;
}

export function phrList(state = Map(), action) {
  switch (action.type) {
    case PhrListActionTypes.FETCH_PHRS_REQUEST:
      return fetchPhrRequest(state, action);
    case PhrListActionTypes.FETCH_PHRS_REQUEST_SUCCESS:
      return fetchPhrRequestSuccess(state, action);
    case PhrListActionTypes.FETCH_PHRS_REQUEST_FAIL:
      return fetchPhrRequestFail(state, action);
    default:
      return state;
  }
}
