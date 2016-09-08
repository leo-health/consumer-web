import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../../redux/actions/slot_list_action_creators';
import {ItemSelectionList} from '../../Generic/ItemSelectionList'

export class SlotList extends Component {

  fetchAction() {
    return actionCreators.fetchSlots(this.props.appointmentTypeID);
  }

  selectAction(objectID) {
    return actionCreators.selectSlot(objectID)
  }

  onClickObject(objectID) {
    this.props.router.goBack();
  }

  renderRow(object) {
    return (
      <div>
        <span>{object.get("start_datetime")}</span>
        <span>{object.getIn(["provider", "name"])}</span>
      </div>
    );
  }

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
  const itemSelectionList = state.get("schedulingSlot");

  debugger;
  return {
    appointmentTypeID: state.getIn(["schedulingAppointmentType", "selectedObjectID"]),
    objects: itemSelectionList.get("objectList"),
    isLoading: itemSelectionList.get("isLoading"),
    selectedObjectID: itemSelectionList.get("selectedObjectID")
  };
}

export const SlotListContainer = connect(mapStateToProps)(withRouter(SlotList));
