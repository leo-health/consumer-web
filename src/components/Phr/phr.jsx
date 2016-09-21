import React from 'react';
import styles from './phr.css';
import PhrHeader from './phrHeader';
import PhrNotes from './phrNotes';
import Allergies from './allergies';
import Medications from './medications';
import Immunizations from './immunizations';
import CSSModules from 'react-css-modules';
import * as loginActionCreators from './phrListActionCreator';

class Phr extends React.Component{
  componentDidMount() {

  }

  render() {
    return (
      <div styleName='container'>
        <PhrHeader/>

        <div styleName='lists'>
          <p>As your daughter's data becomes available this section will populate with important facts and figures
            related to her health and development</p>
          <Allergies/>
          <Medications/>
          <Immunizations/>
          <PhrNotes/>
        </div>
      </div>
    );
  }
};

export default CSSModules(Phr, styles);
