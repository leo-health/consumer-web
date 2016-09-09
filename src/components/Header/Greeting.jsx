import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './greeting.css';

const Greeting = React.createClass({
  render: function() {
    return (
      <div styleName='container'>
        <div styleName='greeting'>Hey, Michelle,</div>
        <div styleName='reminder'>It's that time of year again. Hayden's due for his Hep B immunization</div>
      </div>
    );
  }
});

export default CSSModules(Greeting, styles);
