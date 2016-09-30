import React, {Component} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import moment from 'moment';
import * as actionCreators from 'redux/actions/slot_list_action_creators';
import {ItemSelectionList} from 'components/Generic/ItemSelectionList';
import {getSlotDatesGroupedByWeek, getSlotsGroupedByDate, getSlotWeeks} from 'redux/selectors/slotViewModelSelector';
import ErrorMessage from 'components/Generic/ErrorMessage';
import Calendar from 'components/Appointment/SlotList/Calendar';
import {DATE_FORMATS} from 'config/constants';

import virtualize from 'react-swipeable-views/lib/virtualize';
import SwipeableViews from 'react-swipeable-views';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

export class SlotList extends Component {


  // lifecycle

  constructor(props) {
    super(props);
    this.state = this.getInitialSelectedSlot(props);
  }

  componentDidMount() {
    if (this.props.slotDatesGroupedByWeek.size === 0) {
      this.props.dispatch(actionCreators.fetchSlots(this.props.appointmentTypeID));
    }
  }

  componentWillReceiveProps(nextProps) {
    // TODO: this doesn't belong in the view layer. move filterDate to redux/reselect
    const loadedNewSlots = this.props.slotDatesGroupedByWeek.size === 0 && nextProps.slotDatesGroupedByWeek.size > 0;
    if (loadedNewSlots) {
      // NOTE: using setState here does not trigger a re-render
      this.setState({
        filterDate: nextProps.slotDatesGroupedByWeek.first().first()
      });
    }
  }

  getInitialSelectedSlot({selectedObjectID, slotWeeks, slotDatesGroupedByWeek}) {
    if (slotWeeks.size === 0) return {};

    if (selectedObjectID) {
      // get the selected slot
      const filterMoment = moment(selectedObjectID).startOf("day");
      return {
        filterDate: filterMoment.format(),
        weekIndex: slotWeeks.indexOf(filterMoment.startOf("week").format())
      };
    }

    // get the first available slot of the current week
    const weekStartDate = moment().startOf("week").format();
    return {
      filterDate: slotDatesGroupedByWeek.get(weekStartDate).first(),
      weekIndex: slotWeeks.indexOf(weekStartDate)
    };
  }


  // selectors from local state

  getFilteredSlots() {
    const {filterDate} = this.state;
    if (!filterDate) {
      return List();
    }
    return this.props.slotsGroupedByDate.get(filterDate) || List();
  }

  selectedDateForWeekStartDate(weekStartDate, slotDates) {
    const {filterDate} = this.state;
    if (moment(filterDate).isSame(weekStartDate, "week")) {
      return filterDate;
    }
    return slotDates.first();
  }


  // event handlers

  onChangeIndex(index, latestIndex) {
    const weekStartDate = this.props.slotWeeks.get(index);
    const selectedDate = this.props.selectedObjectID;
    const selectedMoment = moment(selectedDate);
    const filterDate = selectedDate && selectedMoment.isSame(weekStartDate, "week")
      ? selectedMoment.startOf("day").format()
      : this.props.slotDatesGroupedByWeek.get(weekStartDate, List()).first();

    this.setState({
      weekIndex: index,
      filterDate
    });
  }

  onClickDate(date) {
    if (this.props.slotsGroupedByDate.has(date)) {
      this.setState({
        filterDate: date
      });
    }
  }

  onClickSlot(slot) {
    const {dispatch, router} = this.props;
    dispatch(actionCreators.selectSlot(slot));
    router.goBack();
  }


  // renderers

  renderRow(object) {
    const dateString = object.get("start_datetime");
    const datetime = moment(dateString);
    const formattedDate = datetime.format(DATE_FORMATS.HOUR_MINUTE_AM_PM);
    return <span>{formattedDate}</span>;
  }

  renderSwipableCalendar() {
    if (this.props.slotWeeks.size === 0) return null;
    return <VirtualizeSwipeableViews
      slideRenderer={this.renderWeekSlide.bind(this)}
      slideCount={this.props.slotWeeks.size}
      onChangeIndex={this.onChangeIndex.bind(this)}
      index={this.state.weekIndex}
    />
  }

  renderWeekSlide({key, index}) {
    const weekStartDate = this.props.slotWeeks.get(index);
    const slotDates = this.props.slotDatesGroupedByWeek.get(weekStartDate);

    return <Calendar
      key={key}
      weekStartDate={weekStartDate}
      selectedDate={this.selectedDateForWeekStartDate(weekStartDate, slotDates)}
      onClickDate={(date)=>this.onClickDate(date)}
      selectableDates={new Set(slotDates)}/>
  }

  render() {
    if (this.props.apiError) return <ErrorMessage apiError={this.props.apiError}/>;

    return (
      <div>
        {this.renderSwipableCalendar()}
        <ItemSelectionList
          objectList={this.getFilteredSlots()}
          onClickObject={(object)=>this.onClickSlot(object)}
          renderRow={(object)=>this.renderRow(object)}
          {...this.props}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  const itemSelectionList = state.get("schedulingSlot");
  return {
    appointmentTypeID: state.getIn(["schedulingAppointmentType", "selectedObjectID"]),
    slotsGroupedByDate: getSlotsGroupedByDate(state),
    slotDatesGroupedByWeek: getSlotDatesGroupedByWeek(state),
    slotWeeks: getSlotWeeks(state),
    isLoading: itemSelectionList.get("isLoading"),
    selectedObjectID: itemSelectionList.get("selectedObjectID"),
    apiError: itemSelectionList.get("apiError")
  };
}

export const SlotListContainer = connect(mapStateToProps)(withRouter(SlotList));
