import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../../redux/actions/patient_list_action_creators';
import {ItemSelectionList} from '../../Generic/ItemSelectionList'

export class PatientList extends Component {

  // TODO: separate this out [using object extension, inheritence?, find the right way]
  // props? propType = function
  fetchAction() {
    return actionCreators.fetchPatients();
  }

  selectAction(objectID) {
    return actionCreators.selectPatient(objectID)
  }

  onClickObject(objectID) {
    // ????: this doesn't seem right to me.. probably should be in response to a given action, belongs in reducer?
    // NOTE: this actually pops the page off the history, instead of pushing the previous page. Maybe this is what we want.. not sure yet
    // This will not work if we hit this route directly, since there was nothing on the history before
    this.props.router.goBack();
  }

  renderRow(object) {
    return <h2>{object.get("first_name")}</h2>
  }

  // TODO: continue to explore abstraction strategies
  // The following is still duplicated across ItemSelectionList containers.
  render() {
    return <ItemSelectionList
      fetchAction={()=>this.fetchAction()}
      selectAction={(objectID)=>this.selectAction(objectID)}
      onClickObject={(objectID)=>this.onClickObject(objectID)}
      renderRow={(objectID)=>this.renderRow(objectID)}
      {...this.props}
      />
  }
}

function mapStateToProps(state) {
  return {
    objectList: state.get("objectList"),
    isLoading: state.get("isLoading"),
    selectedObjectID: state.get("selectedObjectID")
  };
}

const mapFullStateToProps = (statePath) => (fullState) => {
  const state = fullState.getIn(statePath);
  return mapStateToProps(state);
};

export const PatientListContainer = connect(
  mapFullStateToProps(["schedulingPatient"])
)(withRouter(PatientList));
