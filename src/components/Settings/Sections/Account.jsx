import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './account.css';

const Account = React.createClass({
  render: function() {
    return (
      <div styleName='container'>
        <div styleName='header'>
          Account
        </div>
        <div styleName='option'>
          Email amy.carmichel@gmail.com
        </div>
        <div styleName='divider'></div>
        <div styleName='option'>
          Change my password
        </div>
        <div styleName='divider'></div>
        <div styleName='option'>
          Invite a parent
        </div>
        <div styleName='divider'></div>
      </div>
    );
  }
});

export default CSSModules(Account, styles);
