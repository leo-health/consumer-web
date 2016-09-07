import React from 'react';
import CSSSModules from 'react-css-modules';
import styles from './recent.css';

const Recent = React.createClass({
  render: function() {
    return (
      <div className=''>

        THIS IS THE RECENT COMPONENT
      </div>
    );
  }
});

export default CSSSModules(Recent, styles);
