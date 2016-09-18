import {fromJS, Map} from 'immutable';


// ????: These are not really "reducers" if a reducer is (state, action) => state
// more like reducer helpers, or something like that

export function selectObject(state, selectedObjectID) {
  return state.set("selectedObjectID", selectedObjectID);
}

export function requestObjects(state) {
  return state.set("isLoading",true);
}

export function receiveObjects(state, objectList) {
  return state.set("isLoading", false);
}

export function requestFailure(state, apiError) {
  return state
  .set("apiError", fromJS(apiError))
  .set("isLoading", false);
}
