import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actions/schedule_action_creators';
import CSSModules from 'react-css-modules';
import styles from './scheduler.css';
import {singleEntitySelector} from '../../redux/selectors/entities_selectors';

class _Scheduler extends Component {

  // TODO: use routeURLs constants
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

function propsSelector(state) {

  // currently assuming only one ephemeral appointment
  // TODO: allow rescheduling
  const patientID = state.getIn(["scheduling", "patientID"]);
  const patient = singleEntitySelector(state, "patients", patientID);
  return {patient};
}

export const Scheduler = connect(propsSelector, actionCreators)(withRouter(_Scheduler));
