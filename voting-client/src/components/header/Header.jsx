import React from 'react';
import ProfileDropdown from './ProfileDropdown'


const Header = React.createClass({
  render: function() {
    var logoUrl = require("../../images/logo.png");

    return (
      <div className='header'>
        <img src={logoUrl} alt="Leo Health" className='logo'/>
        <ProfileDropdown/>
      </div>
    );
  }
});

export default Header;
