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
          <div styleName="round" style={{backgroundImage: 'url(http://cdns.yournewswire.com/wp-content/uploads/2015/08/hillary-clinton-twitter-followers-620x264.jpg)'}}></div>
          <div styleName='greeting'>Emily Charmichel</div>
        </div>
      </div>
    );
  }
};

export default CSSModules(PhrHeader, styles);
