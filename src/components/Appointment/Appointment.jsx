import React from 'react';

const Appointment = React.createClass({
  render: function() {
    return (
      <div className=''>
        THIS IS THE Appointment COMPONENT
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default Appointment;
