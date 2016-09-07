import React from 'react';
import CSSSModules from 'react-css-modules';
import styles from './cards.css';

const UpcomingAppointment = React.createClass({
  render: function() {
    return (
      <div styleName='container'>
        <div styleName='header'>
          Upcoming Appointments
        </div>
        <div styleName='description'>
          <span className='orange bold'>Adam</span> has an upcoming appointment on <span className='orange bold'>Friday, July 23rd</span> at <span className='orange bold'>3:35pm</span>.
        </div>
        <div styleName='divider'></div>
      </div>
    );
  }
});

export default CSSSModules(UpcomingAppointment, styles);
