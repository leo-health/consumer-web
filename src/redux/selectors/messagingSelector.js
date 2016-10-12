import {createSelector} from 'reselect';
import {getAllEntitiesList} from 'redux/reducers/entities';

export const apiError = state => state.getIn(["messaging", "apiError"]);
export const isLoading = state => state.getIn(["messaging", "isLoading"]);

export const getAllConversations = getAllEntitiesList("conversations");
export const getPracticeConversation = createSelector(
  getAllConversations,
  conversations => conversations.first()
);
