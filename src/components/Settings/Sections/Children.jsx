import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './account.css';

const Children = React.createClass({
  render: function() {
    return (
      <div styleName='container'>
        <div styleName='header'>
          Children
        </div>
        <div styleName='name'>
          Emily Carmichel
        </div>
        <div styleName='divider'></div>
        <div styleName='name'>
          Jacob Carmichel
        </div>
        <div styleName='divider'></div>
        <div styleName='name'>
          Hayden Carmichel
        </div>
        <div styleName='divider'></div>
        <div styleName='option'>
          Add a Child
        </div>
        <div styleName='divider'></div>
      </div>
    );
  }
});

export default CSSModules(Children, styles);
