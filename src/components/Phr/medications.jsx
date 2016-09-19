import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

const Medications= React.createClass({
  render: function() {
    return (
        <div>
          <p>MEDICATIONS</p>
          <div styleName='greyLine'></div>
          <p>No active medication</p>
        </div>
    );
  }
});

export default CSSModules(Medications, styles);
