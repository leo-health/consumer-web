import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './appointment.css';

const Appointment = React.createClass({
  render: function() {
    return (
      <div>
        <Link to="/">
          <div className='overlay'></div>
        </Link>
        <div className='window'>
          <div styleName='header-container'>
            <Link to="/" styleName='cancel'>
              <i className="fa fa-remove fa-lg white"></i>
            </Link>
            <div styleName='header'>
              Schedule a visit with the practice
            </div>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default CSSModules(Appointment, styles);
