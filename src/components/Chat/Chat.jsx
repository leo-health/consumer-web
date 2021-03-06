import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './chat.css';
import MessageList from './Messages/MessageList';
import ChatInput from './Input/ChatInput';

const Chat = React.createClass({
  render: function() {
    return (
      <div className='chat'>
        <Link to="/">
          <div className='overlay'></div>
        </Link>
        <div className='window'>
          <div styleName='header-container'>
            <Link to="/" className='window-close'>
              <i className="fa fa-remove fa-lg white"></i>
            </Link>
            <div styleName='header'>
              Chat with Leo
            </div>
          </div>
          <div styleName='message-container'>
            <MessageList/>
          </div>
          <div styleName='input-container'>
            <ChatInput/>
          </div>
        </div>
      </div>
    );
  }
});

export default CSSModules(Chat, styles);
