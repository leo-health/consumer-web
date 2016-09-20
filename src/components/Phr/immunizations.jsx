import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class Immunizaitions extends React.Component{
  render() {
    return (
      <div>
        <p>IMMUNIZATIONS</p>
        <div styleName='greyLine'></div>
        <p>Immunizaition history is not available at this time.</p>
      </div>
    );
  }
};

export default CSSModules(Immunizaitions, styles);
