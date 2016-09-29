import React from 'react';
import moment from 'moment';
import styles from './calendar.css';
import {DATE_FORMATS} from 'config/constants';

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

  dateArray(weekStartDate) {
    // TODO: memoize this calculation
    const dates = [];
    let i = 0;
    while (i<7) {
      dates.push(moment(weekStartDate).add(i, "days"));
      i+=1;
    }
    return dates;
  }

  render() {
    const {selectedDate, selectableDates} = this.props;
    return (
      <div className={styles['calendar']}>
        {this.dateArray(this.props.weekStartDate).map((date)=>{
          const dateString = date.format();
          const dateIsSelected = date.isSame(selectedDate, "day");
          const dateIsSelectable = selectableDates.has(dateString);

          let weekItemStyle = 'week-item-disabled';
          if (dateIsSelected) {
            weekItemStyle = 'week-item-selected'; // ????: should append a second css class instead of modifying the class
          } else if (dateIsSelectable) {
            weekItemStyle = 'week-item';
          }

          const lineStyle = dateIsSelected ? 'line' : 'line-hidden';

          return (
            <div key={dateString}
              className={styles[weekItemStyle]}
              onClick={()=>this.onClickDate(dateString)}>
              <div className={styles['week-item-content']}>
                <div className={styles['date-number']}>
                  {date.format(DATE_FORMATS.DAY_OF_MONTH)}
                </div>
                <div className={styles['day-of-week-abbreviation']}>
                  {date.format(DATE_FORMATS.DAY_OF_WEEK_3_LETTER).toUpperCase()}
                </div>
                <div className={styles[lineStyle]}></div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
