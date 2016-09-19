import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actions/slot_list_action_creators';
import moment from 'moment';
import styles from './calendar.css';
import {DATE_FORMATS} from '../../../config/constants';

import {filterSlotsByDate} from '../../../redux/actions/slot_list_action_creators';
import {getSlotFilterDate} from '../../../redux/reducers';

class Calendar extends React.Component {

  // NOTE: needs ES7?
  // static propTypes = {
  //   startDate: React.propTypes.string // TODO: can I require this to be a date?
  // };

  onClickDate(date) {
    console.log(`clicked ${date}`);
    this.props.filterSlotsByDate(date);
  }

  dateArray() {
    // TODO: memoize this calculation
    const {startDate} = this.props;
    const dates = [];
    let i = 0;
    while (i<7) {
      dates.push(moment(startDate).add(i, "days"));
      i+=1;
    }
    return dates;
  }

  render() {

    // TODO: render selected and disabled dates
    const {filterDate} = this.props;

    return (
      <div className={styles['calendar']}>
        {this.dateArray().map((date)=>{
          const dateString = date.format();
          const selected = dateString === filterDate;
          return (
            <div key={dateString}
              className={styles['week-item']}
              onClick={()=>this.onClickDate(date)}>
              <div className={styles['week-item-content']}>
                <div>
                  {date.format(DATE_FORMATS.DAY_OF_MONTH)}
                </div>
                <div>
                  {date.format(DATE_FORMATS.DAY_OF_WEEK_3_LETTER)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filterDate: getSlotFilterDate(state),
  // availableDates: getAvailableSlotDates(state)
});

export default connect(mapStateToProps, {filterSlotsByDate})(Calendar);
