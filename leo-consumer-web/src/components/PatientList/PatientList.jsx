import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/actions/action_creators';

class LoadingSpinner extends Component {
  render() {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}

export class PatientList extends Component {
  render() {
    const {patients, isLoading, ...other} = this.props;

    if (isLoading) {
      return <LoadingSpinner/>;
    }

    return (
      <div>
        {patients.toJS().map(patient=><h2 key={patient.name}>{patient.name}</h2>)}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    patients: state.getIn(["patientListState", "patientList"]),
    isLoading: state.getIn(["patientListState", "isLoading"])
  };
}

export const PatientListContainer = connect(mapStateToProps)(PatientList);
