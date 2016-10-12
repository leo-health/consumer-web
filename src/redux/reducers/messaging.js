import {Map, List, fromJS} from 'immutable';
import {ConversationActionTypes} from 'redux/actions/messaging_action_creators';
import {combineReducers} from 'redux-immutable';

const initialState = {
  apiError: null,
  isLoading: false
};



// TODO: reduce boilerplate by using redux-api-middleware

function apiError(state = initialState.apiError, action) {
  switch (action.type) {
    case ConversationActionTypes.GET_CONVERSATION_REQUEST:
      return null;
    case ConversationActionTypes.GET_CONVERSATION_FAILURE:
      return fromJS(action.payload.apiError);
    default:
      return state;
  }
}

function isLoading(state = initialState.isLoading, action) {
  switch (action.type) {
    case ConversationActionTypes.GET_CONVERSATION_REQUEST:
      return true;
    case ConversationActionTypes.GET_CONVERSATION_SUCCESS:
      return false;
    case ConversationActionTypes.GET_CONVERSATION_FAILURE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  apiError,
  isLoading
});
