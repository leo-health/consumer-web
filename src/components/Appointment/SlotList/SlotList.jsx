import React, {Component} from 'react';
import {fromJS} from 'immutable';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../../redux/actions/slot_list_action_creators';
import {ItemSelectionList} from '../../Generic/ItemSelectionList';
import {getGroupedSlotsByDate} from '../../../redux/reducers';
import ErrorMessage from '../../Generic/ErrorMessage';
import Calendar from './Calendar';
import moment from 'moment';
import {DATE_FORMATS} from '../../../config/constants';

export class SlotList extends Component {


  // lifecycle

  constructor(props) {
    super(props);
    this.state = {}; // TODO: set initial state.filterDate to the date of selected slot
  }

  componentDidMount() {
    this.props.dispatch(actionCreators.fetchSlots(this.props.appointmentTypeID));
  }


  // getters/selectors

  weekStartDate() {
    return moment(this.filterDate()).startOf("week").format();
  }

  filterDate() {
    return this.state.filterDate || this.initialSelectedDate();
  }

  initialSelectedDate() {
    const {groupedSlotsByDate} = this.props;
    if (groupedSlotsByDate) {
      return groupedSlotsByDate.keySeq().first();
    }
  }

  getSelectableDates() {
    return new Set(this.props.groupedSlotsByDate.keys());
  }

  getFilteredSlots() {
    return this.props.groupedSlotsByDate.get(this.filterDate()) || fromJS([]);
  }


  // event handlers

  onClickSlot(slot) {
    const {dispatch, router} = this.props;
    dispatch(actionCreators.selectSlot(slot));
    router.goBack();
  }

  onClickDate(date) {
    if (this.getSelectableDates().has(date)) {
      this.setState({
        filterDate: date
      });
    }
  }


  // renderers

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
        <Calendar
          weekStartDate={this.weekStartDate()}
          filterDate={this.filterDate()}
          onClickDate={(date)=>this.onClickDate(date)}
          selectableDates={this.getSelectableDates()}/>
        <ItemSelectionList
          objectList={this.getFilteredSlots()}
          onClickObject={(object)=>this.onClickSlot(object)}
          renderRow={(object)=>this.renderRow(object)}
          {...this.props}/>
      </div>
    );
  }
}



// TODO: ????: reduce boilerplate - slice subset of immutable Map
function mapStateToProps(state) {
  const itemSelectionList = state.get("schedulingSlot");
  return {
    appointmentTypeID: state.getIn(["schedulingAppointmentType", "selectedObjectID"]),
    groupedSlotsByDate: getGroupedSlotsByDate(state),
    isLoading: itemSelectionList.get("isLoading"),
    selectedObjectID: itemSelectionList.get("selectedObjectID"),
    apiError: itemSelectionList.get("apiError")
  };
}

export const SlotListContainer = connect(mapStateToProps)(withRouter(SlotList));
