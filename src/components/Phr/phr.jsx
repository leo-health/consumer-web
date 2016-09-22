import React from 'react';
import styles from './phr.css';
import PhrHeader from './phrHeader';
import PhrNotes from './phrNotes';
import Allergies from './allergies';
import Vitals from './vitals';
import Medications from './medications';
import Immunizations from './immunizations';
import CSSModules from 'react-css-modules';
import * as phrListActionCreators from './phrListActionCreators';
import {connect} from 'react-redux';
import {allEntitiesSelector} from '../../redux/selectors/entities_selectors';
import {withRouter} from 'react-router';

class _Phr extends React.Component{
  constructor() {
    super();
  }

  componentDidMount() {
    //this.props.fetchPatients();
    this.props.fetchPhrsAsync({id: 1})
  }

  renderSelector(){
    if(this.props.allergies === 0 && this.props.medications === 0 && this.props.heights === 0
        && this.props.weights === 0 && this.props.medications === 0 && this.props.immuizations === 0){
      return(
        <div styleName='lists'>
          <div styleName='greyLine'></div>
          <p>As your daughter's data becomes available this section will populate with important facts and figures
            related to her health and development</p>
          <PhrNotes/>
        </div>
      )
    }else{
      return(
        <div styleName='lists'>
          <Vitals heights={this.props.heights}
                  weights={this.props.weights}/>
          <Allergies allergies={this.props.allergies}/>
          <Medications medications={this.props.medications}/>
          <Immunizations immunizations={this.props.immunizations}/>
          <PhrNotes/>
        </div>
      )
    }
  }

  render() {
    return (
      <div styleName='container'>
        <PhrHeader patients={this.props.patients}/>
        {this.renderSelector()}
      </div>
    );
  }
}

function phrStateSelector(state) {
  return {
    allergies: state.getIn(["phrList", "allergies"]),
    medications: state.getIn(["phrList", "medications"]),
    immunizations: state.getIn(["phrList", "immunizations"]),
    heights: state.getIn(["phrList", "heights"]),
    weights: state.getIn(["phrList", "weights"]),
    patients: allEntitiesSelector(state, "patients")
  };
}

export const Phr = connect(phrStateSelector, phrListActionCreators)(withRouter(CSSModules(_Phr, styles)));
