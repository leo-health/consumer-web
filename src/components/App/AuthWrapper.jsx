import React from 'react';
import {connect} from 'react-redux';
import {routeURLs} from './Routes';
import {withRouter} from 'react-router';

// NOTE:AF: I didn't use this library for now, because I want to make sure we fully understand any outside code, given the react/redux environment is fairly new and potentially unstable
// we may need more complex authentication behavior in the future, in which case we can come back to this library
// https://github.com/mjrussell/redux-auth-wrapper

export default function wrapAuthenticatedComponent(DecoratedComponent, authSelector) {

  class AuthWrapper extends React.Component {

    componentWillMount() {
      // apparently this doesnt exits... Cannot read property 'call' of undefined
      // super.componentWillMount(); // ????: is this necessary?
      this.authenticatedOrRedirect();
    }

    componentWillReceiveProps() {
      this.authenticatedOrRedirect();
    }

    authenticatedOrRedirect() {
      const {authData, router} = this.props;
      if (!this.authenticated(authData)) {
        router.replace(routeURLs.login);
      }
    }

    authenticated(authData) {
      return !!authData;
    }

    render() {
      const { authData, ...otherProps } = this.props;

      if (this.authenticated(authData)) {
        return <DecoratedComponent {...otherProps}/>;
      }
      // We should never get here. let's double check - we do get here when not authenticated
      // TODO: does it cause a problem that we render this component, then redirect?
      return null; // ????: should we return something else if the user isn't authenticated?
    }
  };

  return connect((state)=>{
    return {authData: authSelector(state)}
  })(withRouter(AuthWrapper));
};
