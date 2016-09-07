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

export class AppointmentTypesList extends Component {
  render() {
    const {appointmentTypes, isLoading, ...other} = this.props;

    if (isLoading) {
      return <LoadingSpinner/>;
    }

    return (
      <div>
        {appointmentTypes.map(appointmentType=><h2>appointmentType.name</h2>)}
      </div>
    );
  }
}
