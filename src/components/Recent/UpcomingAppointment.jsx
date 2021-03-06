import React from 'react';
import CSSSModules from 'react-css-modules';
import styles from './cards.css';
import { Link } from 'react-router';


const UpcomingAppointment = React.createClass({
  render: function() {
    var appointmentUrl = require("../../images/green-calendar.png");

    return (
      <div styleName='green-container'>
        <div styleName='content-container'>
          <div styleName='icon-container'>
            <img src={appointmentUrl} alt="Appointments" styleName='icon'/>
          </div>
          <div styleName='text-container'>
            <div styleName='green-name'>
              Emily
            </div>
            <div styleName='header'>
              Schedule Emily's First Visit
            </div>
            <div styleName='description'>
              Take a tour of the practice and meet with our world class physicians.
            </div>
          </div>
        </div>
        <div className='bold' styleName='options-container'>
          <Link to="/appointment" className='unstyled gray'>
            <div styleName="option">Schedule a visit</div>
          </Link>
        </div>
      </div>
    );
  }
});

export default CSSSModules(UpcomingAppointment, styles);
