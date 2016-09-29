import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './message.css';

const Message = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.data.message}
      </div>
    );
  }
});

export default CSSModules(Message, styles);
