import {fromJS, Map} from 'immutable';
import {ActionTypes} from '../actions/action_creators';
import {PatientListActionTypes} from '../actions/patient_list';

function setState(state, newState) {
  return state.merge(fromJS(newState));
}

function selectPatient(state, payload) {
  const {patient} = payload;
  return state.setIn(
    ["patientListState", "selectedPatient"],
    fromJS(patient)
  );
}

// TODO: use reducer composition

function requestPatients(state) {
  return state.setIn(
    ["patientListState", "isLoading"],
    true
  );
}

function receivePatients(state, payload) {
  return state.setIn(
    ["patientListState", "patientList"],
    fromJS(payload.patientList)
  ).setIn(
    ["patientListState", "isLoading"],
    false
  );
}


// TODO: reduce boilerplate

export default function reducer(state = Map(), action) {
  switch (action.type) {
    case ActionTypes.SET_STATE:
      return setState(state, action.payload);
    case PatientListActionTypes.SELECT_PATIENT:
      return selectPatient(state, action.payload);
    case PatientListActionTypes.REQUEST_PATIENTS:
      return requestPatients(state);
    case PatientListActionTypes.RECEIVE_PATIENTS:
      return receivePatients(state, action.payload);
  }
  return state
}
