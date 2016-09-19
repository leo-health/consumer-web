import React from 'react';
import { Link } from 'react-router';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

const PhrNotes= React.createClass({
  render: function() {
    return (
      <div>
        <p>NOTES</p>
        <div styleName='greyLine'></div>
        <p>Let us know if there are any special instructions not included in the form.</p>
      </div>
    );
  }
});

export default CSSModules(PhrNotes, styles);
