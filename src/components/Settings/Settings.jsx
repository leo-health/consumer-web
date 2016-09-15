import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import styles from './settings.css';
import {routeURLs} from '../App/Routes';
import {logoutAsync} from './settings_action_creators';

class _Settings extends React.Component {

  onClickLogout() {
    this.props.router.push(routeURLs.login);
    this.props.logoutAsync();
  }

  render() {
    return (
      <button
        onClick={()=>this.onClickLogout()}
        className={styles['logout-button']}>
        Logout
      </button>
    );
  }
}

export const Settings = connect(null, {logoutAsync})(withRouter(_Settings));
