import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as patientListActionCreators from '../../redux/actions/patient_list_action_creators';

class _PhrHeader extends React.Component {
  componentDidMount() {
    this.props.fetchPatients();
  }

  renderPatients(){
    if(!this.props.patients) return;
    var patients = this.props.patients;
    if(patients.length > 0){
      patients = patients.map(function(patient, i){
        return <li key={i}>{patient.first_name}</li>
      })
    }
    return patients
  }

  render() {
    var backUrl = require("../../images/back_arrow@3x.png");
    return (
      <div styleName='header'>
        <div styleName='top'>
          <Link to="/">
            <img styleName='backArrow' src={backUrl}/>
          </Link>
          <ul styleName='patientNames'>
            {this.renderPatients()}
          </ul>
        </div>
        <div styleName='whiteLine'></div>
        <div styleName='bottom'>
          <div styleName="round" style={{backgroundImage: 'url(http://vignette1.wikia.nocookie.net/nickelodeon/images/2/25/Spongebob-spongebob-squarepants-33210737-2392-2187.jpg/revision/latest?cb=20131006193851)'}}></div>
          <div styleName='greeting'>Emily Charmichel</div>
        </div>
      </div>
    );
  }
}

function patientsSelector(state){
  return {
    patients: state.getIn(["schedulingPatient", "patients"])
  }
}

export const PhrHeader = connect(patientsSelector, patientListActionCreators)(withRouter(CSSModules(_PhrHeader, styles)));
