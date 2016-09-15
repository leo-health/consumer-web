import React from 'react';
import { Link } from 'react-router';
import Header from './header';

module.exports = React.createClass({
  render: function() {
    return (
        <div>
          I am wrapper
          <Header/>
          <div className='phrList'>
          </div>
        </div>
    );
  }
});

//<Measures/>
//<Allergies/>
//<Medications/>
//<Immunizations/>
//<Notes/>
//import Measures from './measures';
//import Allergies from './allergies';
//import Medications from './medications';
//import Immunizations from './immunizations';
//import Notes from './notes';
