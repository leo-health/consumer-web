import URI from 'urijs';
import fetch from 'isomorphic-fetch';
import {authenticationTokenSelector} from 'redux/selectors/authentication';
import * as Constants from '../../config/constants';

export const ConversationActionTypes = {
  GET_CONVERSATION_REQUEST: "GET_CONVERSATION_REQUEST",
  GET_CONVERSATION_SUCCESS: "GET_CONVERSATION_SUCCESS",
  GET_CONVERSATION_FAILURE: "GET_CONVERSATION_FAILURE"
};

export function getConversationRequest() {
  return {
    type: ConversationActionTypes.GET_CONVERSATION_REQUEST
  };
}

export function getConversationSuccess(objectList) {
  return {
    type: ConversationActionTypes.GET_CONVERSATION_SUCCESS,
    payload: {objectList}
  };
}

export function getConversationFailure(apiError) {
  return {
    type: ConversationActionTypes.GET_CONVERSATION_FAILURE,
    payload: {apiError}
  };
}

export function getConversation() {
  return (dispatch, getState) => {

    dispatch(getConversationRequest());

    const params = {authentication_token: authenticationTokenSelector(getState())}
    const uri = URI(Constants.API_BASE_URL)
    .segment("families/conversation")
    .query(params);

    return fetch(uri)
    .then(response => response.json())
    .then(json => dispatch(getConversationSuccess([json.data.conversation])));
  };
}
