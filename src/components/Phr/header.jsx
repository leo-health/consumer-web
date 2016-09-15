import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './header.css';

const Header = React.createClass({
  render: function() {
    return (
      <div styleName={styles.container}>
        <div styleName='greeting'>Hey, Michelle,</div>
        <div styleName='reminder'>It's that time of year again. Hayden's due for his Hep B immunization</div>
      </div>
    );
  }
});

export default CSSModules(Header, styles);
