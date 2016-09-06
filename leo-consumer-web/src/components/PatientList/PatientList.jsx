import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as patientListActionCreators from '../../redux/actions/patient_list_action_creators';

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
    this.props.dispatch(patientListActionCreators.fetchPatients());
  }

  selectPatient(patientID) {
    this.props.dispatch(patientListActionCreators.selectPatient(patientID));
  }

  onClickPatient(patientID) {
    this.selectPatient(patientID);
    this.props.history.goBack();
  }

  renderIfSelected(patientID) {
    if (patientID === this.props.selectedPatientID) {
      return <h1>{"test"}</h1>;
    }
    return null;
  }

  render() {

    const {patients, isLoading} = this.props;

    if (isLoading || !patients) {
      return <LoadingSpinner/>;
    }

    return (
      <div>
        {patients.map(patient=>{
          return (<button key={patient.get("id")} onClick={()=>
              this.onClickPatient(patient.get("id"))
            }>
            {this.renderIfSelected(patient.get("id"))}
            <h2>{patient.get("first_name")}</h2>
          </button>);
        })}
      </div>
    );
  }
}

// PatientList.propTypes = {
//   isLoading: React.PropTypes.bool,
//   patients: React.PropTypes.arrayOf(
//     React.PropTypes.shape({
//       id: React.PropTypes.number,
//       first_name: React.PropTypes.string
//     })
//   ).isRequired
// };
// PatientList.defaultProps = {
//   isLoading: true,
//   patients: []
// };


function mapStateToProps(state) {
  return {
    patients: state.getIn(["patientListState", "patientList"]),
    isLoading: state.getIn(["patientListState", "isLoading"]),
    selectedPatientID: state.getIn(["patientListState", "selectedPatientID"])
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
