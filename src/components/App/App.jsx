import React from 'react';
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import styles from './global.css';

export default React.createClass({

  render: function() {
    return (
      <div className="container">
        <Header/>
        <Navbar/>
          <div className="body">
            { this.props.children }
          </div>
      </div>
    );
  }
});
