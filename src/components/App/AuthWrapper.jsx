import React from 'react';
import {routeURLs} from './Routes';
import {withRouter} from 'react-router';

// TODO: we may need more complex authentication behavior in the future
// https://github.com/mjrussell/redux-auth-wrapper

function wrapAuthenticatedComponent(DecoratedComponent, authSelector) {

  class AuthWrapper extends React.Component {

    authenticatedOrRedirect(authData) {
      const {router} = this.props;

      if (!authData) {
        router.replace(routeURLs.login);
      }
    }

    render() {
      const { authData, ...otherProps } = this.props;

      if (this.authenticatedOrRedirect(authData)) {
        return <DecoratedComponent {...otherProps}/>;
      }
      return null; // ????: should we return something else if the user isn't authenticated?
    }
  };

  return connect((state)=>{
    return {authData: authSelector(state)}
  })(withRouter(AuthWrapper));
}
