import React from 'react';
import { Link } from 'react-router';

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
          <li>
            <Link to="/children" className='navbar--item'>
              <i className="fa fa-child fa-2x navbar--item--icon"></i>
              Children
            </Link>
          </li>
          <li>
            <Link to="/appointment" className='navbar--item'>
              <i className="fa fa-calendar-o fa-2x navbar--item--icon"></i>
              Appts
            </Link>
          </li>
          <li>
            <Link to="/chat" className='navbar--item'>
              <i className="fa fa-commenting-o fa-2x navbar--item--icon"></i>
              Chat
            </Link>
          </li>
          <li>
            <Link to="/settings" className='navbar--item'>
              <i className="fa fa-gear fa-2x navbar--item--icon"></i>
              Settings
            </Link>
          </li>
        </ul>
      </div>
    );
  }
});

export default Navbar;
