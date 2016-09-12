import React from 'react';
import CSSSModules from 'react-css-modules';
import styles from './recent.css';
import UpcomingAppointment from './UpcomingAppointment.jsx';
import ChatCard from './ChatCard.jsx';
import ContentCard from './ContentCard.jsx';

const Recent = React.createClass({
  render: function() {
    return (
      <div className='gray' styleName='container'>
        <UpcomingAppointment/>
        <ChatCard/>
        <ContentCard/>
        <ContentCard/>
      </div>
    );
  }
});

export default CSSSModules(Recent, styles);
