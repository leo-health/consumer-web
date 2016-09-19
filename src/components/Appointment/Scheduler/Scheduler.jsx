import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actions/schedule_action_creators';
import CSSModules from 'react-css-modules';
import styles from './scheduler.css';
import {singleEntitySelector} from '../../../redux/selectors/entities_selectors';
import {routeURLs} from '../../App/Routes';
import moment from 'moment';
import {DATE_FORMATS} from '../../../config/constants';

// TODO: find a good pattern for these higher order components
class _Scheduler extends Component {

  readyToChooseSlot() {
    const {appointmentType, patient} = this.props;
    return appointmentType && patient;
  }

  onClickSlots() {
    if (this.readyToChooseSlot()) {
      this.props.router.push(routeURLs.appointment_choose_slot);
    }
  }

  onClickSubmit() {
    this.routeToHome(); // TODO: only on success
    this.props.schedule();
  }

  routeToHome() {
    const successfullyScheduled = true; // TODO: fill in using actions/state
    if (successfullyScheduled) {
      this.props.router.push(routeURLs.index);
    }
  }

  slotCopy() {
    const {slot} = this.props;
    if (slot) {
      const formattedTime = moment(slot.get("start_datetime")).format(DATE_FORMATS.HOUR_MINUTE_AM_PM);
      console.log(DATE_FORMATS.FULL_SPELLED_DATE);
      const formattedDate = moment(slot.get("start_datetime")).format(DATE_FORMATS.FULL_SPELLED_DATE);
      return `My visit is at ${formattedTime} on ${formattedDate}`;
    } else if (this.readyToChooseSlot()) {
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
      <div styleName='container'>
        <div onClick={()=>this.props.router.push(routeURLs.appointment_choose_appointment_type)}
             styleName='option'>
          {appointmentTypeCopy}
          <div styleName='line'></div>
        </div>
        <div onClick={()=>this.props.router.push(routeURLs.appointment_choose_patient)}
             styleName='option'>
          {patientCopy}
          <div styleName='line'></div>
        </div>
        <textarea defaultValue={notesCopy}
                  styleName='text'></textarea>
        <div styleName='line'></div>
          <div onClick={()=>this.onClickSlots()}
             styleName='option'>
          {slotCopy}
          <div styleName='line'></div>
        </div>
        <div onClick={()=>this.onClickSubmit()}
             styleName='button'>
          <div styleName='label-container'>
            <div styleName='label'>
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

export const Scheduler = connect(propsSelector, actionCreators)(withRouter(CSSModules(_Scheduler, styles)));
