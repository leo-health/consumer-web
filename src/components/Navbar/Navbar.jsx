import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './navbar.css';

const Navbar = React.createClass({
  render: function() {
    return (
      <div styleName='container'>
        <ul styleName='navbar' role="nav">
          <li>
            <Link to="/" styleName='item'>
              <i className="fa fa-clock-o fa-2x" styleName='icon'></i>
              Recent
            </Link>
          </li>
          <li>
            <Link to="/children" styleName='item'>
              <i className="fa fa-child fa-2x" styleName='icon'></i>
              Children
            </Link>
          </li>
          <li>
            <Link to="/appointment" styleName='item'>
              <i className="fa fa-calendar-o fa-2x" styleName='icon'></i>
              Appts
            </Link>
          </li>
          <li>
            <Link to="/chat" styleName='item'>
              <i className="fa fa-commenting-o fa-2x" styleName='icon'></i>
              Chat
            </Link>
          </li>
          <li>
            <Link to="/settings" styleName='item'>
              <i className="fa fa-gear fa-2x" styleName='icon'></i>
              Settings
            </Link>
          </li>
        </ul>
      </div>
    );
  }
});

export default CSSModules(Navbar, styles);
