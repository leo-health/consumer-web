import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

const Navbar = React.createClass({
  render: function() {
    return (
      <div className='navbar--container'>
        <ul className='navbar' role="nav">
          <li>
            <Link to="/" className='navbar--item'>
              <i className="fa fa-clock-o fa-2x navbar--item--icon"></i>
              Recent
            </Link>
          </li>
          <li className='navbar--item'>
            <i className="fa fa-child fa-2x navbar--item--icon"></i>
            Children
          </li>
          <li className='navbar--item'>
            <i className="fa fa-calendar-o fa-2x navbar--item--icon"></i>
            Appts
          </li>
          <li>
            <Link to="/chat" className='navbar--item'>
              <i className="fa fa-commenting-o fa-2x navbar--item--icon"></i>
              Chat
            </Link>
          </li>
          <li className='navbar--item'>
            <i className="fa fa-gear fa-2x navbar--item--icon"></i>
            Settings
          </li>
        </ul>
      </div>
    );
  }
});

export default Navbar;
