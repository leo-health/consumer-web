import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class Allergies extends React.Component{
  render() {
    return (
      <div>
        <p>ALLERGIES</p>
        <div styleName='greyLine'></div>
        <p>No known allergies</p>
      </div>
    );
  }
};

export default CSSModules(Allergies, styles);
