import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './chat-input.css';

const ChatInput = React.createClass({
  render: function() {
    var cameraUrl = require("../../../images/camera.png");
    return (
      <div>
        <img src={cameraUrl} alt="Photo Upload" styleName='camera'/>
        <div styleName='input-container'>
          <input type="text"
                 placeholder="Type a message..."
                 styleName='input'/>
        </div>
        <div styleName='button'>
          Send
        </div>
      </div>
    );
  }
});

export default CSSModules(ChatInput, styles);
