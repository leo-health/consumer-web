import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './profile-dropdown.css';

const ProfileDropdown = React.createClass({
  render: function() {
    return (
      <div styleName='container'>
        <span styleName='avatar-container'>
          <i className='fa fa-user fa-lg' styleName='avatar'></i>
        </span>
        <span styleName='greeting'>Good evening, Albert <i className="fa fa-caret-down"></i></span>
      </div>
    );
  }
});

export default CSSModules(ProfileDropdown, styles);
