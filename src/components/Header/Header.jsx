import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './header.css';


const Header = React.createClass({
  render: function() {
    var logoUrl = require("../../images/logo.png");

    return (
      <div styleName='header'>
        <Link to="/">
          <img src={logoUrl} alt="Leo Health" styleName='logo'/>
        </Link>
        <ProfileDropdown/>
      </div>
    );
  }
});

export default CSSModules(Header, styles);
