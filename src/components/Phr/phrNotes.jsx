import React from 'react';
import { Link } from 'react-router';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

const PhrNotes= React.createClass({
  render: function() {
    return (
      <div>
        As your daughter's data becomes available this section will populate with important facts and figures
        related to her health and development
        <p>ALLERGIES</p>
        <div styleName='greyLine'></div>
        <p>No known allergies</p>

        <p>MEDICATIONS</p>
        <div styleName='greyLine'></div>
        <p>No active medication</p>

        <p>IMMUNIZATIONS</p>
        <div styleName='greyLine'></div>
        <p>Immunizaiton history is not available at this time.</p>


        <p>NOTES</p>
        <div styleName='greyLine'></div>
        <p>Let us know if there are any special instructions not included in the form.</p>
      </div>
    );
  }
});

export default CSSModules(PhrNotes, styles);
