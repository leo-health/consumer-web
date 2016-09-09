import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../../redux/actions/appointment_type_list_action_creators';
import {ItemSelectionList} from '../../Generic/ItemSelectionList'

export class AppointmentTypeList extends Component {

  fetchAction() {
    return actionCreators.fetchAppointmentTypes();
  }

  selectAction(object) {
    return actionCreators.selectAppointmentType(object)
  }

  onClickObject(object) {
    this.props.router.goBack();
  }

  renderRow(object) {
    return <h2>{object.get("name")}</h2>
  }

  render() {
    return <ItemSelectionList
      fetchAction={()=>this.fetchAction()}
      selectAction={(object)=>this.selectAction(object)}
      onClickObject={(object)=>this.onClickObject(object)}
      renderRow={(object)=>this.renderRow(object)}
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

export const AppointmentTypeListContainer = connect(
  mapFullStateToProps(["schedulingAppointmentType"])
)(withRouter(AppointmentTypeList));
