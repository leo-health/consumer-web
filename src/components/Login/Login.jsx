import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './login.css';
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

  onClickLogin() {
    const {email, password} = this.state;
    this.props.submitLoginAsync(email, password);
  }

  render() {
    if (this.props.isLoading) { return <LoadingSpinner/>; }

    var logoUrl = require("../../images/long-logo.png");

    return (
      <div styleName='container'>
        <div styleName='logo-container'>
          <img src={logoUrl} alt="Leo Health"/>
        </div>
        <div styleName='input-container'>
          <input type="text"
            placeholder="Email"
            styleName='input'
            onChange={(e)=>this.onChangeInput(e, "email")}
            value={this.state.email}
            />
        </div>
        <div styleName='input-container'>
          <input type="password"
            placeholder="Password"
            styleName='input'
            onChange={(e)=>this.onChangeInput(e, "password")}
            value={this.state.password}
            />
          <button styleName='button'
            onClick={()=>this.onClickLogin()}>
            Login
          </button>
        </div>
        <div styleName='question'>
          Not a member yet?
          <a href="https://provider.leohealth.com/registration"
             styleName='link'>
          Join Leo
        </a>
        </div>
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

export const Login = connect(loginStateSelector, loginActionCreators)(withRouter(CSSModules(_Login, styles)));
