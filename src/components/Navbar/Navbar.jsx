import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './navbar.css';

const Navbar = React.createClass({
  render: function() {
    return (
      <div styleName='container'>
        <div styleName='link-container'>
          <Link to="/appointment" styleName='link'>
            Schedule a visit
          </Link>
        </div>
        <div styleName='divider'></div>
        <div styleName='link-container'>
          <Link to="/" styleName='link'>
            Message us
          </Link>
        </div>
      </div>
    );
  }
});

export default CSSModules(Navbar, styles);
