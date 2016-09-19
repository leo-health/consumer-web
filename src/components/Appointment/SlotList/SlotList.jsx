import React, {Component} from 'react';
import {fromJS} from 'immutable';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../../redux/actions/slot_list_action_creators';
import {ItemSelectionList} from '../../Generic/ItemSelectionList';
import ErrorMessage from '../../Generic/ErrorMessage';
import {getFilteredSlots} from '../../../redux/reducers';
import Calendar from './Calendar';
import moment from 'moment';
import {DATE_FORMATS} from '../../../config/constants';

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
    const dateString = object.get("start_datetime");
    const datetime = moment(dateString);
    const formattedDate = datetime.format(DATE_FORMATS.HOUR_MINUTE_AM_PM);
    return <span>{formattedDate}</span>;
  }

  render() {

    if (this.props.apiError) {
      const {apiError} = this.props;
      return <ErrorMessage apiError={apiError}/>;
    }

    return (
      <div>
        <Calendar startDate={this.props.objectList[0] || moment()}/>
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
    objectList: getFilteredSlots(state, "slots") || fromJS([]),
    isLoading: itemSelectionList.get("isLoading"),
    selectedObjectID: itemSelectionList.get("selectedObjectID"),
    apiError: itemSelectionList.get("apiError")
  };
}

export const SlotListContainer = connect(mapStateToProps)(withRouter(SlotList));
