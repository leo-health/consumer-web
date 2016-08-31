import React from 'react';
import Header from './header/Header'
import '../stylesheets/main.css';

export default React.createClass({

  render: function() {
    return (
      <div className="container">
        <Header/>
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
