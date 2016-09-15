import URI from 'urijs';
import fetch from 'isomorphic-fetch';
import * as Constants from '../../config/constants';

export const ScheduleActionTypes = {
  SCHEDULE_APPOINTMENT_REQUEST: "SCHEDULE_APPOINTMENT_REQUEST",
  SCHEDULE_APPOINTMENT_SUCCESS: "SCHEDULE_APPOINTMENT_SUCCESS",
  SCHEDULE_APPOINTMENT_FAILURE: "SCHEDULE_APPOINTMENT_FAILURE"
};

export function scheduleAppointmentRequest() {
  return {
    type: ScheduleActionTypes.SCHEDULE_APPOINTMENT_REQUEST
  };
}

export function scheduleAppointmentSuccess(response) {
  return {
    type: ScheduleActionTypes.SCHEDULE_APPOINTMENT_SUCCESS,
    response
  };
}

export function scheduleAppointmentFailure(response) {
  return {
    type: ScheduleActionTypes.SCHEDULE_APPOINTMENT_FAILURE,
    response
  };
}

// ????: is this a selector? - https://github.com/reactjs/reselect
function scheduleParams(state) {

  // TODO: restructure state to use table-like collections - find inspiration in mongodb documents
  // state.get("slots").filter(slot=>slot.id == selectedObjectID)
  return {
    authentication_token: state.getIn(["authentication","token"]),
    start_datetime: state.getIn(["schedulingSlot", "selectedObjectID"]),
    appointment_status_id: 4,
    appointment_type_id: state.getIn(["schedulingAppointmentType", "selectedObjectID"]),
    provider_id: state.getIn(["schedulingSlot", "selectedProviderID"]),
    patient_id: state.getIn(["schedulingPatient", "selectedObjectID"]),
    practice_id: 1
  }
}

export function schedule() {
  return (dispatch, getState) => {


    // TODO: Clear slots on schedule.
    // ????: When are some other times where we should be clearing state?


    dispatch(scheduleAppointmentRequest());

    const params = scheduleParams(getState());
    const uri = URI(Constants.API_BASE_URL)
    .segment("appointments")
    .query(params);

    return fetch(uri, {method: "post"})
    .then(response => response.json())
    .then(json => dispatch(scheduleAppointmentSuccess(json)));
  };
}
