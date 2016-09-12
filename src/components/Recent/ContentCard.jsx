import React from 'react';
import CSSSModules from 'react-css-modules';
import styles from './cards.css';

const ContentCard = React.createClass({
  render: function() {
    return (
      <div styleName='container'>
        <div styleName='content-container'>
          <div styleName='text-container'>
            <div styleName='header'>
              Vitamins essential to Newborn Development
            </div>
            <div className='orange' styleName='description'>
              According to researchers, these are 5 vitamins essential to newborn development.
            </div>
          </div>
        </div>
        <div className='bold' styleName='options-container'>
          <div styleName="option">Dismiss</div>
        </div>
      </div>
    );
  }
});

export default CSSSModules(ContentCard, styles);
