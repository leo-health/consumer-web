import React, {Component} from 'react';
import {fromJS} from 'immutable';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../../redux/actions/slot_list_action_creators';
import {ItemSelectionList} from '../../Generic/ItemSelectionList';
import ErrorMessage from '../../Generic/ErrorMessage';
import {allEntitiesSelector} from '../../../redux/selectors/entities_selectors';
import Calendar from './Calendar';
import moment from 'moment';

export class SlotList extends Component {

  fetchAction() {
    return actionCreators.fetchSlots(this.props.appointmentTypeID);
  }

  selectAction(object) {
    return actionCreators.selectSlot(object)
  }

  onClickObject(object) {
    this.props.router.goBack();
  }

  renderRow(object) {
    const formattedDate = object.get("start_datetime");
    return <span>{formattedDate}</span>;
  }

  render() {

    if (this.props.apiError) {
      const {apiError} = this.props;
      return <ErrorMessage apiError={apiError}/>;
    }

    return (
      <div>
        <div>
          <Calendar startDate={this.props.objectList[0] || moment()}/>
        </div>
        <ItemSelectionList
          fetchAction={()=>this.fetchAction()}
          selectAction={(object)=>this.selectAction(object)}
          onClickObject={(object)=>this.onClickObject(object)}
          renderRow={(object)=>this.renderRow(object)}
          {...this.props}
          />
      </div>
    );
  }
}

// TODO: ????: reduce boilerplate - slice subset of immutable Map
function mapStateToProps(state) {
  const itemSelectionList = state.get("schedulingSlot");
  return {
    appointmentTypeID: state.getIn(["schedulingAppointmentType", "selectedObjectID"]),
    objectList: allEntitiesSelector(state, "slots") || fromJS([]),
    isLoading: itemSelectionList.get("isLoading"),
    selectedObjectID: itemSelectionList.get("selectedObjectID"),
    apiError: itemSelectionList.get("apiError")
  };
}

export const SlotListContainer = connect(mapStateToProps)(withRouter(SlotList));
