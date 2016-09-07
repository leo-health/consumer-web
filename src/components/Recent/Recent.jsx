import React from 'react';
import CSSSModules from 'react-css-modules';
import styles from './recent.css';
import UpcomingAppointment from './UpcomingAppointment.jsx';
import MissingVaccines from './MissingVaccines.jsx';
import ContentCard from './ContentCard.jsx';

const Recent = React.createClass({
  render: function() {
    return (
      <div className='gray' styleName='container'>
        <div>
          <div className='orange' styleName='header'>
            Welcome back
          </div>
          <UpcomingAppointment/>
          <MissingVaccines/>
        </div>
        <div styleName='content-container'>
          <div className='orange' styleName='header'>
            Just for you
          </div>
          <ContentCard/>
          <ContentCard/>
        </div>
      </div>
    );
  }
});

export default CSSSModules(Recent, styles);
