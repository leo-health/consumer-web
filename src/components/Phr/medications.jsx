import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class Medications extends React.Component {
  render() {
    return (
      <div>
        <p styleName='sectionTitle'>MEDICATIONS</p>
        <div styleName='greyLine'></div>
        <p>No active medication</p>
      </div>
    );
  }
};

export default CSSModules(Medications, styles);
