import React from 'react';
import {connect} from 'react-redux';
import * as loginActionCreators from './login_action_creators';

function loginPropsSelector(state) {
  const authState = state.get("authentication");
  if (!authState) {
    return {};
  }
  
  return {
    email: authState.get("email"),
    password: authState.get("password"),
    authentication_token: authState.get("authentication_token")
  }
}

export const Login = connect(loginPropsSelector, loginActionCreators)(
  ({submitLoginAsync}) => {
    return (
      <div>
        <form onSubmit={()=>submitLoginAsync()}>
          <p>Login to your account</p>
          <fieldset>
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <button type="submit">Login</button>
          </fieldset>
        </form>
      </div>
    );
  }
);
