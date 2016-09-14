import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {routeURLs} from '../App/Routes';
import LoadingSpinner from '../Generic/LoadingSpinner';
import * as loginActionCreators from './login_action_creators';

class _Login extends React.Component {

  constructor() {
    super()
    this.state = {
      email: "adam+1997@leohealth.com",
      password: "password"
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.router.push(routeURLs.index);
    }
  }

  onChangeInput(event, stateKey) {
    this.setState({
      [stateKey]: event.target.value
    });
  }

  onSubmit() {
    const {email, password} = this.state;
    this.props.submitLoginAsync(email, password);
  }

  render() {

    if (this.props.isLoading) {
      return <LoadingSpinner/>;
    }

    return (
      <div>
        <p>Login to your account</p>
        <input type="text"
          placeholder="Email"
          onChange={(e)=>this.onChangeInput(e, "email")}
          value={this.state.email}
          />
        <input type="password"
          placeholder="Password"
          onChange={(e)=>this.onChangeInput(e, "password")}
          value={this.state.password}
          />
        <button onClick={()=>this.onSubmit()}>Login</button>
      </div>
    );
  }
}

function loginStateSelector(state) {
  return {
    token: state.getIn(["authentication", "token"]),
    isLoading: state.getIn(["authentication", "isLoading"])
  };
}

export const Login = connect(loginStateSelector, loginActionCreators)(withRouter(_Login));
