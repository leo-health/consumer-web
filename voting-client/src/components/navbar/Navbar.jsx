import React from 'react';


const Navbar = React.createClass({
  render: function() {
    return (
      <div className='navbar--container'>
        <ul className='navbar'>
          <li className='navbar--item'>
            <i className="fa fa-clock-o fa-2x navbar--item--icon"></i>
            Recent
          </li>
          <li className='navbar--item'>
            <i className="fa fa-child fa-2x navbar--item--icon"></i>
            Children
          </li>
          <li className='navbar--item'>
            <i className="fa fa-calendar-o fa-2x navbar--item--icon"></i>
            Appts
          </li>
          <li className='navbar--item'>
            <i className="fa fa-commenting-o fa-2x navbar--item--icon"></i>
            Chat
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
