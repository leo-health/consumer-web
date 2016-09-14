import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actions/schedule_action_creators';
import CSSModules from 'react-css-modules';
import styles from './scheduler.css';


// TODO: find a good pattern for these higher order components

class _Scheduler extends Component {

  relativeURLConcat(nextPath) {
    return [this.props.location.pathname,nextPath].join("/");
  }

  onClickRelativeURLPush(nextPath) {
    this.props.router.push(this.relativeURLConcat(nextPath));
  }

  render() {
    return (
      <div className={styles.container}>
        <div onClick={()=>this.onClickRelativeURLPush("appointment_types")}
             className={styles.option}>
          What are you coming in for?
          <div className={styles.line}></div>
        </div>
        <div onClick={()=>this.onClickRelativeURLPush("patients")}
             className={styles.option}>
          Which children need to be seen?
          <div className={styles.line}></div>
        </div>
        <textarea defaultValue='Add any questions or comments you have about the appointment.'
                  className={styles.text}></textarea>
        <div className={styles.line}></div>
        <div onClick={()=>this.onClickRelativeURLPush("slots")}
             className={styles.option}>
          When would you like to come in?
          <div className={styles.line}></div>
        </div>
        <div onClick={()=>this.props.schedule()}
             className={styles.button}>
          <div className={styles.labelContainer}>
            <div className={styles.label}>
              Confirm Visit
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // TODO: fill in
  };
}

export const Scheduler = connect(mapStateToProps, actionCreators)(withRouter(_Scheduler));
