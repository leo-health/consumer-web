import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './settings.css';
import {routeURLs} from '../App/Routes';
import {logoutAsync} from './settings_action_creators';
import Account from './Sections/Account';
import Children from './Sections/Children';

class _Settings extends React.Component {

  onClickLogout() {
    this.props.router.push(routeURLs.login);
    this.props.logoutAsync();
  }

  render() {
    return (
      <div>
        <div styleName='header'>
          <Link to="/" styleName='back'>
            <i className='fa fa-arrow-left fa-lg'></i>
          </Link>
          Settings
        </div>
        <Account/>
        <Children/>
        <div styleName='logout-container'>
          <button
            onClick={()=>this.onClickLogout()}
            styleName='logout'>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export const Settings = connect(null, {logoutAsync})(withRouter(CSSModules(_Settings, styles)));
