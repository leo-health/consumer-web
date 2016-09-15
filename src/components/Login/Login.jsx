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
    if (this.props.isLoading) {
      return <LoadingSpinner/>;
    }

    return (
      <div>
        <div className={styles['container']}>
          <div className={styles['header-container']}>
            <div className={styles['header']}>
              Login to your account
            </div>
          </div>
          <input type="text"
            placeholder="Email"
            className={styles['input-field']}
            onChange={(e)=>this.onChangeInput(e, "email")}
            value={this.state.email}
            />
          <input type="password"
            placeholder="Password"
            className={styles['input-field']}
            onChange={(e)=>this.onChangeInput(e, "password")}
            value={this.state.password}
            />
          <button className={styles['button']}
            onClick={()=>this.onClickLogin()}>
            Login
          </button>
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

const Router_Login = withRouter(_Login);
const Style_Router_Login = CSSModules(Router_Login, styles);
export const Login = connect(loginStateSelector, loginActionCreators)(Style_Router_Login);
