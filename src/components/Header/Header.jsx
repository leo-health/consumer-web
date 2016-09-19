import React from 'react';
import Greeting from './Greeting';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './header.css';


const Header = React.createClass({
  render: function() {
    var logoUrl = require("../../images/logo.png");
    var settingsUrl = require("../../images/settings.png");
    var phrUrl = require("../../images/phr.png");
    var containerClass = 'expanded-container';
    var greetingClass = 'expanded'
    if(this.props.scrollPosition > 15) {
      greetingClass = 'collapsed';
      containerClass = 'collapsed-container';
    }

    return (
      <div styleName={containerClass}>
        <div styleName='button-container'>
          <Link to="/settings" styleName='settings'>
            <img src={settingsUrl} alt="Leo Health" styleName='logo'/>
          </Link>
          <Link to="/phr" styleName='phr'>
            <img src={phrUrl} alt="Leo Health" styleName='logo'/>
          </Link>
        </div>
        <div styleName='logo-container'>
          <Link to="/">
            <img src={logoUrl} alt="Leo Health" styleName='logo'/>
          </Link>
        </div>
        <div styleName={greetingClass}>
          <Greeting/>
        </div>
      </div>
    );
  }
});

export default CSSModules(Header, styles);
