import React from 'react';

const Winner = React.createClass({
  render: function() {
    return <div ref="winner">Winner is {this.props.winner}</div>;
  }
});

export default Winner;
