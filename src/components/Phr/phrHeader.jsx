import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';

class PhrHeader extends React.Component {
  render() {
    var backUrl = require("../../images/back_arrow@3x.png");
    return (
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
          <div styleName="round" style={{backgroundImage: 'url(http://vignette1.wikia.nocookie.net/nickelodeon/images/2/25/Spongebob-spongebob-squarepants-33210737-2392-2187.jpg/revision/latest?cb=20131006193851)'}}></div>
          <div styleName='greeting'>Emily Charmichel</div>
        </div>
      </div>
    );
  }
};

export default CSSModules(PhrHeader, styles);
