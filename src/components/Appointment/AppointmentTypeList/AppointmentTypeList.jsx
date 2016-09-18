import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../../redux/actions/appointment_type_list_action_creators';
import {ItemSelectionList} from '../../Generic/ItemSelectionList';
import {allEntitiesSelector} from '../../../redux/selectors/entities_selectors';

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
    return <div>{object.get("name")}</div>
  }

  render() {
    console.log(this.props);
    return <ItemSelectionList
      fetchAction={()=>this.fetchAction()}
      selectAction={(object)=>this.selectAction(object)}
      onClickObject={(object)=>this.onClickObject(object)}
      renderRow={(object)=>this.renderRow(object)}
      {...this.props}
      />
  }
}

function appointmentTypeListSelector(state) {
  return {
    objectList: allEntitiesSelector(state, "appointment_types"),
    isLoading: state.getIn(["schedulingAppointmentType","isLoading"]),
    selectedObjectID: state.getIn(["schedulingAppointmentType","selectedObjectID"])
  };
}

export const AppointmentTypeListContainer = connect(appointmentTypeListSelector)(withRouter(AppointmentTypeList));
