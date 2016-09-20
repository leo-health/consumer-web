import React, {Component} from 'react';
import {fromJS} from 'immutable';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../../redux/actions/slot_list_action_creators';
import {ItemSelectionList} from '../../Generic/ItemSelectionList';
import ErrorMessage from '../../Generic/ErrorMessage';
import {getAllEntities} from '../../../redux/reducers/entities';
import Calendar from './Calendar';
import moment from 'moment';
import {DATE_FORMATS} from '../../../config/constants';

export class SlotList extends Component {


  // lifecycle

  constructor(props) {
    super(props);
    this.state = {}; // TODO: set initial state.filterDate to the date of selected slot
  }

  componentWillReceiveProps(props) {

    // count and filter slots by date
    // const slotMap = {};
    debugger;



  }

  componentDidReceiveProps() {
    debugger;
  }

  componentDidMount() {
    this.props.dispatch(actionCreators.fetchSlots(this.props.appointmentTypeID));
  }


  // getters

  weekStartDate() {
    return moment(this.filterDate()).startOf("week").format();
  }

  filterDate() {
    const today = moment().format();
    return this.state.filterDate || this.firstSlotDate() || today;
  }

  firstSlotDate() {
    const {slots} = this.props;
    if (slots && slots.length > 0) {
      return moment(slots[0].get("start_datetime")).startOf("day").format();
    }
  }

  getFilteredSlots() {

    // TODO: memoize

    const {slots} = this.props;
    if (!slots) { return []; }
    const filterDate = this.filterDate();
    const filteredSlots = slots.filter(slot => {
      const slotTime = moment(slot.get("start_datetime"));
      return slotTime.isSame(filterDate, "day");
    });

    return filteredSlots;
  }


  // event handlers

  onClickSlot(slot) {
    const {dispatch, router} = this.props;
    dispatch(actionCreators.selectSlot(slot));
    router.goBack();
  }

  onClickDate(date) {
    this.setState({
      filterDate: moment(date).startOf("day").format() // do we need startOf here?
    });
  }


  // renderers

  renderRow(object) {
    const dateString = object.get("start_datetime");
    const datetime = moment(dateString);
    const formattedDate = datetime.format(DATE_FORMATS.HOUR_MINUTE_AM_PM);
    return <span>{formattedDate}</span>;
  }

  render() {

    debugger;

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
          disabledDates={new Set()}/>
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
    slots: getAllEntities(state, "slots"),
    isLoading: itemSelectionList.get("isLoading"),
    selectedObjectID: itemSelectionList.get("selectedObjectID"),
    apiError: itemSelectionList.get("apiError")
  };
}

export const SlotListContainer = connect(mapStateToProps)(withRouter(SlotList));
