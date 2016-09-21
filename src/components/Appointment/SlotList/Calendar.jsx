import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actions/slot_list_action_creators';
import moment from 'moment';
import styles from './calendar.css';
import {DATE_FORMATS} from '../../../config/constants';

import {filterSlotsByDate} from '../../../redux/actions/slot_list_action_creators';
import {getSlotFilterDate} from '../../../redux/reducers';

export default class Calendar extends React.Component {

  // NOTE: needs ES7?
  // static propTypes = {
  //   weekStartDate: React.propTypes.string // TODO: can I require this to be a date?
  // };

  onClickDate(date) {
    if (this.props.onClickDate) {
      this.props.onClickDate(date);
    }
  }

  dateArray() {
    // TODO: memoize this calculation
    const {weekStartDate} = this.props;
    const dates = [];
    let i = 0;
    while (i<7) {
      dates.push(moment(weekStartDate).add(i, "days"));
      i+=1;
    }
    return dates;
  }

  render() {

    // TODO: render selected and disabled dates
    const {filterDate, selectableDates} = this.props;

    return (
      <div className={styles['calendar']}>
        {this.dateArray().map((date)=>{
          const dateString = date.format();

          let className = 'week-item-disabled';
          if (date.isSame(filterDate, "day")) {
            className = 'week-item-selected'; // should append a second css class instead of modifying the class
          } else if (selectableDates.has(dateString)) {
            className = 'week-item';
          }

          return (
            <div key={dateString}
              className={styles[className]}
              onClick={()=>this.onClickDate(dateString)}>
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
