import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {routeURLs} from '../App/Routes';
import {logoutAsync} from './settings_action_creators';

class _Settings extends React.Component {

  onClickLogout() {
    this.props.router.push(routeURLs.login);
    this.props.logoutAsync();
  }

  render() {
    return (
      <div className=''>
        <button onClick={()=>this.onClickLogout()}>Logout</button>
      </div>
    );
  }
}

export const Settings = connect(null, {logoutAsync})(withRouter(_Settings));
