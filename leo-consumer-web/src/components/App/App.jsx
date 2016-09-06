import React from 'react';
import '../stylesheets/main.css';

export default React.createClass({

  render: function() {
    return (
      <div className="container">
        <div className="header">
          <h1 className="logo">Leo Health</h1>
          <div className="welcome">
            <p>Welcome to Leo + Flatiron Pediatrics</p>
          </div>
        </div>
        <div className="body">
          <h1 className="sidebar">Leo Health</h1>
          <div className="main-body">
            <p>Welcome to Leo + Flatiron Pediatrics</p>
          </div>
        </div>
      </div>
    );
  }
});
