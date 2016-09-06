import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../redux/actions/patient_list';

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

  componentDidMount() {
    this.props.dispatch(actionCreators.fetchPatients());
  }

  selectPatient(patientID) {
    this.props.dispatch(actionCreators.selectPatient(patientID));
  }

  routeBack() {
    debugger;
  }

  onClickPatient(patientID) {
    selectPatient(patientID);
    routeBack();
  }

  render() {



    if (this.props.isLoading) {
      return <LoadingSpinner/>;
    }

    let patients = this.props.patients.toJS();

    return (
      <div>
        {patients.map(patient=>{
          return (<div key={patient.id} onClick={()=>
              this.onClickPatient(patient.id)
            }>
            <h2>{patient.first_name}</h2>
          </div>);
        })}
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

// Not really that useful. Am I using it incorrectly?
// function mapDispatchToProps(dispatch) {
//   return {
//     selectPatient: (id) => {
//       dispatch(actionCreators.selectPatient(id))
//     },
//
//     fetchPatients: () => {
//       dispatch(actionCreators.fetchPatients())
//     }
//   };
// }

export const PatientListContainer = connect(mapStateToProps)(PatientList);
