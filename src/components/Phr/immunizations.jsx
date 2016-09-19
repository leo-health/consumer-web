import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

const Immunizaitions= React.createClass({
  render: function() {
    return (
        <div>
          <p>IMMUNIZATIONS</p>
          <div styleName='greyLine'></div>
          <p>Immunizaition history is not available at this time.</p>
        </div>
    );
  }
});

export default CSSModules(Immunizaitions, styles);
