import {fromJS, Map} from 'immutable';
import {PhrListActionTypes} from '../../components/Phr/phrListActionCreators';
import localStorageHelper from '../../utils/localStorageHelper';

function fetchPhrRequest(state, action) {
  return state.set("isLoading", true);
}

function fetchPhrRequestSuccess(state, action) {
  debugger
  return state.set('allergies', action.allergies);

}

function fetchPhrRequestFail(state, action) {
 debugger
}

export function phrList(state = Map(), action) {
  switch (action.type) {
    case PhrListActionTypes.FETCH_PHRS_REQUEST:
      return fetchPhrRequest(state, action);
    case PhrListActionTypes.FETCH_PHRS_REQUEST_SUCCESS:
      return fetchPhrRequestSuccess(state, action);
    case PhrListActionTypes.FETCH_PHRS_REQUEST_FAIL:
      return fetchPhrRequestFail(state, action);
  }
  return state;
}
