import React from 'react';
import { Link } from 'react-router';
import styles from './phr.css';
import PhrNotes from './phrNotes'
import Allergies from './allergies'
import Medications from './medications'
import Immunizations from './immunizations'
import CSSModules from 'react-css-modules';

const Phr= React.createClass({
  render: function() {
    var backUrl = require("../../images/back_arrow@3x.png");

    return (
      <div styleName='container'>
        <div styleName='header'>
          <div styleName='top'>
            <Link to="/">
              <img styleName='backArrow' src={backUrl}/>
            </Link>
            <ul styleName='patientNames'>
              <li>Christopher</li>
              <li>Emily</li>
              <li>Jaco</li>
              <li>Hayden</li>
              <li>Hover</li>
              <li>Wayne</li>
              <li>Tracy</li>
              <li>Hilary</li>
              <li>Jasmine</li>
            </ul>
          </div>

          <div styleName='whiteLine'></div>

          <div styleName='bottom'>
            <div styleName="round" style={{backgroundImage: 'url(http://cdns.yournewswire.com/wp-content/uploads/2015/08/hillary-clinton-twitter-followers-620x264.jpg)'}}></div>
            <div styleName='greeting'>Emily Charmichel</div>
          </div>
        </div>

        <div styleName='lists'>
          <p>As your daughter's data becomes available this section will populate with important facts and figures
            related to her health and development</p>
          <Allergies/>
          <Medications/>
          <Immunizations/>
          <PhrNotes/>
        </div>
      </div>
    );
  }
});

export default CSSModules(Phr, styles);
