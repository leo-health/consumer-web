import React, {Component} from 'react';

export const DEFAULT_ERROR_USER_MESSAGE = "Something went wrong. Please contact support@leohealth.com if the problem persists.";

export default class ErrorMessage extends Component {

  componentWillUnmount() {
    super.componentWillUnmount(); // ????: Not sure if I actually need this
    // TODO: Remove error message after initial display/dismiss
  }

  render() {
    const {apiError} = this.props;

    const userMessage = apiError.getIn(["message","user_message"]);
    const debugMessage = apiError.getIn(["message","debug_message"]);
    const message = userMessage || DEFAULT_ERROR_USER_MESSAGE;

    // TODO: use logging library so we can turn these things off in prod
    console.log(`ERROR: ${debugMessage}`);

    return (
      <div>
        <h1>Oops!</h1>
        <p>{message}</p>
      </div>
    );
  }
}
