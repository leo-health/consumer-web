import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actions/schedule_action_creators';
import CSSModules from 'react-css-modules';
import styles from './scheduler.css';
import {singleEntitySelector} from '../../../redux/selectors/entities_selectors';
import {routeURLs} from '../../App/Routes';

class _Scheduler extends Component {

  componentWillReceiveProps(nextProps) {

  }

  routeToHome() {
    const successfullyScheduled = true; // TODO: fill in using actions/state
    if (successfullyScheduled) {
      this.props.router.push(routeURLs.index);
    }
  }

  onClickSubmit() {
    this.routeToHome(); // TODO: only on success
    this.props.schedule();
  }

  slotCopy({appointmentType, patient, slot}) {
    if (slot) {
      const formattedTime = slot.get("start_datetime"); // TODO: format correctly
      const formattedDate = slot.get("start_datetime"); // TODO: format correctly
      return `My visit is at ${formattedTime} on ${formattedDate}`;
    } else if (appointmentType && patient) {
      return "When would you like to be seen?";
    }
    return "Please complete the fields above to select a date and time";
  }

  uiCopy(props) {
    const {appointmentType, patient, slot} = props;
    const appointmentTypeCopy = appointmentType ? `I'm scheduling a ${appointmentType.get("name")}` : "What brings you in?";
    const patientCopy = patient ? `This appointment is for ${patient.get("first_name")}` : "Who is this visit for?";
    const slotCopy = this.slotCopy(props);
    const submitButtonCopy = "CONFIRM VISIT";
    const notesCopy = "What would you like to cover?";
    return {appointmentTypeCopy, patientCopy, slotCopy, submitButtonCopy, notesCopy};
  }

  render() {
    const {appointmentTypeCopy, patientCopy, slotCopy, submitButtonCopy, notesCopy} = this.uiCopy(this.props);
    return (
      <div className={styles.container}>
        <div onClick={()=>this.props.router.push(routeURLs.appointment_choose_appointment_type)}
             className={styles.option}>
          {appointmentTypeCopy}
          <div className={styles.line}></div>
        </div>
        <div onClick={()=>this.props.router.push(routeURLs.appointment_choose_patient)}
             className={styles.option}>
          {patientCopy}
          <div className={styles.line}></div>
        </div>
        <textarea defaultValue={notesCopy}
                  className={styles.text}></textarea>
        <div className={styles.line}></div>
        <div onClick={()=>this.props.router.push(routeURLs.appointment_choose_slot)}
             className={styles.option}>
          {slotCopy}
          <div className={styles.line}></div>
        </div>
        <div onClick={()=>this.onClickSubmit()}
             className={styles.button}>
          <div className={styles.labelContainer}>
            <div className={styles.label}>
              {submitButtonCopy}
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
  const patientID = state.getIn(["schedulingPatient", "selectedObjectID"]);
  const patient = singleEntitySelector(state, "patients", patientID);
  const appointmentTypeID = state.getIn(["schedulingAppointmentType", "selectedObjectID"]);
  const appointmentType = singleEntitySelector(state, "appointment_types", appointmentTypeID);
  const slotID = state.getIn(["schedulingSlot", "selectedObjectID"]);
  const slot = singleEntitySelector(state, "slots", slotID);
  return {patient, appointmentType, slot};
}

export const Scheduler = connect(propsSelector, actionCreators)(withRouter(_Scheduler));
