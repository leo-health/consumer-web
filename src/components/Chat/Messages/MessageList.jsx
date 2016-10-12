import React from 'react';
import LoadingSpinner from 'components/Generic/LoadingSpinner';
import ErrorMessage from 'components/Generic/ErrorMessage';
import {connect} from 'react-redux';
import {
  getPracticeConversation,
  isLoading,
  apiError
} from 'redux/selectors/messagingSelector';

const MessageList = ({isLoading, apiError, conversation}) => {
  if (isLoading) { return <LoadingSpinner />; }
  if (apiError) { return <ErrorMessage {...{apiError}} />; }
  return (
    <div>
      {conversation.get("messages").map(
        (message, i) =>
          <div key={i}>{message.get("body")}</div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    conversation: getPracticeConversation(state),
    isLoading: isLoading(state),
    apiError: apiError(state)
  };
}

export default connect(mapStateToProps)(MessageList);
