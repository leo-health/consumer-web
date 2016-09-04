import React from 'react';

const ProfileDropdown = React.createClass({
  render: function() {
    return (
      <div className='profile-dropdown--container'>
        <span className='profile-dropdown--picture--container'>
          <i className="fa fa-user fa-lg profile-dropdown--picture"></i>
        </span>
        <span className='profile-dropdown--name'>Good evening, Albert <i className="fa fa-caret-down"></i></span>
      </div>
    );
  }
});

export default ProfileDropdown;
