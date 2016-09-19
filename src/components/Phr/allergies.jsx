import React from 'react';
import { Link } from 'react-router';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

const PhrNotes= React.createClass({
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

export default CSSModules(PhrNotes, styles);
