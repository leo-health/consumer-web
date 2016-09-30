import {Map} from 'immutable';
import {AppointmentTypeListActionTypes} from '../actions/appointment_type_list_action_creators';
import {
  selectObject,
  requestObjects,
  receiveObjects,
  requestFailure
} from './object_list';

export default function schedulingAppointmentType(state = Map(), action) {
  switch (action.type) {
    case AppointmentTypeListActionTypes.SELECT_APPOINTMENT_TYPE:
      return selectObject(state, action.payload.appointmentType.get("id"));
    case AppointmentTypeListActionTypes.REQUEST_APPOINTMENT_TYPE:
      return requestObjects(state);
    case AppointmentTypeListActionTypes.RECEIVE_APPOINTMENT_TYPE:
      return receiveObjects(state, action.payload.objectList);
  }
  return state;
}
