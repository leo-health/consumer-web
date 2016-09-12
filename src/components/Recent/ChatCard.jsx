import React from 'react';
import CSSSModules from 'react-css-modules';
import styles from './cards.css';

const ChatCard = React.createClass({
  render: function() {
    var chatUrl = require("../../images/blue-chat.png");

    return (
      <div styleName='blue-container'>
        <div styleName='content-container'>
          <div styleName='icon-container'>
            <img src={chatUrl} alt="Appointments" styleName='icon'/>
          </div>
          <div styleName='text-container'>
            <div styleName='blue-name'>
              Carol Kester <span className='gray'>RN</span>
            </div>
            <div styleName='description'>
              Welcome to Leo. If you have any questions or comments, you can reach us at any time.
            </div>
          </div>
        </div>
        <div className='bold' styleName='options-container'>
          <div styleName="left-option">Reply</div>
          <div styleName="right-option">Call us</div>
        </div>
      </div>
    );
  }
});

export default CSSSModules(ChatCard, styles);
