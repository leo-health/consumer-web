import React, {Component} from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import moment from 'moment';
import * as actionCreators from 'redux/actions/slot_list_action_creators';
import {ItemSelectionList} from 'components/Generic/ItemSelectionList';
import {getSlotDatesGroupedByWeek, getSlotsGroupedByDate} from 'redux/selectors/slotViewModelSelector';
import ErrorMessage from 'components/Generic/ErrorMessage';
import Calendar from 'components/Appointment/SlotList/Calendar';
import {DATE_FORMATS} from 'config/constants';
import SwipeableViews from 'react-swipeable-views';

export class SlotList extends Component {


  // lifecycle

  constructor(props) {
    super(props);
    if (props.selectedObjectID) {
      this.state = {
        filterDate: moment(props.selectedObjectID).startOf("day").format()
      };
    } else {
      this.state = {};
    }
  }

  componentDidMount() {
    this.props.dispatch(actionCreators.fetchSlots(this.props.appointmentTypeID));
  }

  componentWillReceiveProps(nextProps) {
    // TODO: this doesn't belong in the view layer. move filterDate to redux/reselect
    const loadedNewSlots = this.props.slotDatesGroupedByWeek.size == 0 && nextProps.slotDatesGroupedByWeek.size > 0;
    if (loadedNewSlots) {
      // NOTE: using setState here does not trigger a re-render
      this.setState({
        filterDate: nextProps.slotDatesGroupedByWeek.first().first()
      });
    }
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
    const firstAvailableDateInCurrentWeek = this.props.slotDatesGroupedByWeek
      .valueSeq()
      .get(index, List())
      .first();
    this.setState({filterDate: firstAvailableDateInCurrentWeek});
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

  render() {
    if (this.props.apiError) {
      const {apiError} = this.props;
      return <ErrorMessage apiError={apiError}/>;
    }

    return (
      <div>
        <SwipeableViews onChangeIndex={this.onChangeIndex.bind(this)}>
          {this.props.slotDatesGroupedByWeek.entrySeq().map(([weekStartDate, slotDates]) => {
            return <Calendar
              key={weekStartDate}
              weekStartDate={weekStartDate}
              selectedDate={this.selectedDateForWeekStartDate(weekStartDate, slotDates)}
              onClickDate={(date)=>this.onClickDate(date)}
              selectableDates={new Set(slotDates)}/>
          })}
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


function mapStateToProps(state) {
  const itemSelectionList = state.get("schedulingSlot");
  return {
    appointmentTypeID: state.getIn(["schedulingAppointmentType", "selectedObjectID"]),
    slotsGroupedByDate: getSlotsGroupedByDate(state),
    slotDatesGroupedByWeek: getSlotDatesGroupedByWeek(state),
    isLoading: itemSelectionList.get("isLoading"),
    selectedObjectID: itemSelectionList.get("selectedObjectID"),
    apiError: itemSelectionList.get("apiError")
  };
}

export const SlotListContainer = connect(mapStateToProps)(withRouter(SlotList));
