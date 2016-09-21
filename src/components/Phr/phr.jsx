import React from 'react';
import styles from './phr.css';
import PhrHeader from './phrHeader';
import PhrNotes from './phrNotes';
import Allergies from './allergies';
import Medications from './medications';
import Immunizations from './immunizations';
import CSSModules from 'react-css-modules';
import * as phrListActionCreators from './phrListActionCreators';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class _Phr extends React.Component{
  constructor() {
    super();
    this.state = {allergies: []}
  }

  componentDidMount() {
    this.props.fetchPhrsAsync({id: 1})
  }

  render() {
    return (
      <div styleName='container'>
        <PhrHeader/>
        <div styleName='lists'>
          <p>As your daughter's data becomes available this section will populate with important facts and figures
            related to her health and development</p>
          <Allergies allergies={this.state.allergies}/>
          <Medications/>
          <Immunizations/>
          <PhrNotes/>
        </div>
      </div>
    );
  }
}

function phrStateSelector(state) {
  return {
    token: state.getIn(["authentication", "token"]),
    isLoading: state.getIn(["authentication", "isLoading"])
  };
}

export const Phr = connect(phrStateSelector, phrListActionCreators)(withRouter(CSSModules(_Phr, styles)));
