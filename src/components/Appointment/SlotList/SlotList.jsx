import React, {Component} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import moment from 'moment';
import * as actionCreators from 'redux/actions/slot_list_action_creators';
import {ItemSelectionList} from 'components/Generic/ItemSelectionList';
import {getGroupedSlotsByDate} from 'redux/reducers';
import ErrorMessage from 'components/Generic/ErrorMessage';
import Calendar from 'components/Appointment/SlotList/Calendar';
import {DATE_FORMATS} from 'config/constants';
import virtualize from 'react-swipeable-views/lib/virtualize';
import SwipeableViews from 'react-swipeable-views';

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

  getSelectableDates() {
    return new Set(this.props.groupedSlotsByDate.keys());
  }

  getFilteredSlots() {
    const {filterDate} = this.state;
    if (!filterDate) {
      return List();
    }
    return this.props.groupedSlotsByDate.get(filterDate) || List();
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

  onChangeIndex(index, latestIndex) {
    console.log(`onChangeIndex ${index}  ${latestIndex}`);

    // setState( filterDate: first available slot  )

  }

  renderWeekCalendars() {
    const {groupedSlotsByDate} = this.props;
    if (!groupedSlotsByDate) {
      debugger;
      return null;
    }

    const availableSlotDateSet = this.getSelectableDates();
    const lastSlotDate = moment(groupedSlotsByDate.keySeq().last());
    const lastWeekSlotDate = lastSlotDate.startOf("week");

    const dateIsAvailable = (date)=>availableSlotDateSet.has(date.format());
    const dateIsPartOfWeek = (date, weekStart)=>weekStart.isSame(date, "week");

    // construct an array of calendar components for every week between the first and last slot
    const calendarViewModel = [];
    let weekStartDate = moment(groupedSlotsByDate.keySeq().first()).startOf("week");

    while (weekStartDate.isBefore(lastSlotDate)) {

      // get the first available date in the current week
      let nextDay = weekStartDate.clone();
      while (dateIsPartOfWeek(nextDay, weekStartDate)) {
        if (dateIsAvailable(nextDay)) {
          break;
        }
        nextDay.add(1, "day");
      }

      // don't select a date if there are no available slots in that week
      let selectedDate = dateIsPartOfWeek(nextDay, weekStartDate) ? nextDay.format() : null;

      // render the user-selected date if it is in the current week
      const {filterDate} = this.state;
      if (filterDate && dateIsPartOfWeek(filterDate, weekStartDate)) {
        selectedDate = filterDate;
      }

      calendarViewModel.push({
        key: weekStartDate.format(),
        weekStartDate: weekStartDate.format(),
        selectedDate: selectedDate
      });

      weekStartDate.add(1, "week");
    }

    return calendarViewModel;
  }


  render() {
    if (this.props.apiError) {
      const {apiError} = this.props;
      return <ErrorMessage apiError={apiError}/>;
    }

    return (
      <div>
        <SwipeableViews onChangeIndex={this.onChangeIndex.bind(this)}>
          {this.renderWeekCalendars().map(({key, weekStartDate, selectedDate}) => (
            <Calendar
              key={key}
              weekStartDate={weekStartDate}
              selectedDate={selectedDate}
              onClickDate={(date)=>this.onClickDate(date)}
              selectableDates={this.getSelectableDates()}/>
          ))}
        </SwipeableViews>
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
