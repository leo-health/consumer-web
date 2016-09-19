import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

const Allergies= React.createClass({
  render: function() {
    return (
      <div>
        <p>ALLERGIES</p>
        <div styleName='greyLine'></div>
        <p>No known allergies</p>
      </div>
    );
  }
});

export default CSSModules(Allergies, styles);
