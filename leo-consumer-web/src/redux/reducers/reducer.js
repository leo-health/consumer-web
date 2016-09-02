import {fromJS, Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function selectPatient(state, payload) {
  const {patient} = payload;
  return state.set("selectedPatient", fromJS(patient))
}

function selectAppointmentType(state, payload) {
  const {appointmentType} = payload;
  return state.set("selectedAppointmentType", fromJS(appointmentType))
}

function selectSlot(state, payload) {
  const {slot} = payload;
  return state.set("selectedSlot", fromJS(slot));
}

export default function reducer(state = Map(), action) {
  switch (action.type) {
    case "SELECT_PATIENT":
      return selectPatient(state, action.payload);
    case "SELECT_APPOINTMENT_TYPE":
      return selectAppointmentType(state, action.payload);
    case "SELECT_SLOT":
      return selectSlot(state, action.payload);
  }
  return state
}
