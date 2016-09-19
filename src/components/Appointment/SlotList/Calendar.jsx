import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actions/slot_list_action_creators';
import {allEntitiesSelector} from '../../../redux/selectors/entities_selectors';
import moment from 'moment';
import styles from './calendar.css';


export default class Calendar extends React.Component {

  // NOTE: needs ES7?
  // static propTypes = {
  //   startDate: React.propTypes.string // TODO: can I require this to be a date?
  // };

  onClickObject(object) {
    console.log(`clicked ${object}`);
  }

  dateArray() {
    // TODO: memoize this calculation
    const {startDate} = this.props;
    const dates = [];
    let i = 0;
    while (i<7) {
      dates.push(moment(startDate).add(1, "days"));
    }
    return dates;
  }

  render() {
    return (
      <div className={styles.calendar}>
      {
        this.dateArray().map((date)=>{
          <span>date</span>
        })
      }
      </div>
    );
  }
}
