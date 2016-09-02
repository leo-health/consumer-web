import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import * as actionCreators from '../action_creators';

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
        {patients.map(patient=><h2>patient.name</h2>)}
      </div>
    );
  }
}
