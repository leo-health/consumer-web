import React from 'react';
import CSSSModules from 'react-css-modules';
import styles from './cards.css';

const UpcomingAppointment = React.createClass({
  render: function() {
    return (
      <div styleName='container'>
        <div styleName='header'>
          Missing Vaccines
        </div>
        <div styleName='description'>
          <span className='orange bold'>Boaty</span> is due for a Hep B vaccination on <span className='orange bold'>Thursday, August 3rd</span>.
        </div>
        <div styleName='divider'></div>
      </div>
    );
  }
});

export default CSSSModules(UpcomingAppointment, styles);
