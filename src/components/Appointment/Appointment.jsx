import React from 'react';
import { Link } from 'react-router';

const Appointment = React.createClass({
  render: function() {
    return (
      <div>
        <Link to="/">
          <div className='overlay'></div>
        </Link>
        <div className='window'>
          THIS IS THE Appointment COMPONENT
          <div>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

export default Appointment;
