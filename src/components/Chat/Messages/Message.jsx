import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './message.css';

const Message = React.createClass({
  render: function() {
    return (
      <div>
        <div styleName='avatar-container'>
          <img src={this.props.data.avatar} alt="User Avatar" styleName='avatar'/>
        </div>
        <div styleName='provider-content-container'>
          <div styleName="sender">
            {this.props.data.sender}
          </div>
          <div styleName="date">
            · {this.props.data.timestamp}
          </div>
          <div styleName='provider-message'>
            {this.props.data.message}
          </div>
        </div>
      </div>
    );
  }
});

export default CSSModules(Message, styles);
