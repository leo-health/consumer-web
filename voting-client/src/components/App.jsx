import React from 'react';
import Header from './header/Header'
import Navbar from './navbar/Navbar'
import '../stylesheets/main.css';

export default React.createClass({

  render: function() {
    return (
      <div className="container">
        <Header/>
        <Navbar/>
        <div className="body">
          <div className="main-body">
            <p>Welcome to Leo + Flatiron Pediatrics</p>
          </div>
        </div>
      </div>
    );
  }
});
