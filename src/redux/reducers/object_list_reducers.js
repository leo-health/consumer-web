import {fromJS, Map} from 'immutable';

export function selectObject(state, selectedObjectID) {
  return state.set("selectedObjectID", selectedObjectID);
}

export function requestObjects(state) {
  return state.set("isLoading",true);
}

export function receiveObjects(state, objectList) {
  return state.set("objectList", fromJS(objectList))
    .set("isLoading",false);
}
