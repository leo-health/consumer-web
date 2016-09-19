import {Map} from 'immutable';
import {combineReducers} from 'redux-immutable';

import authentication from './authentication';
import entities from './entities';
import schedulingSlot from './schedulingSlot';
import schedulingPatient from './schedulingPatient';
import schedulingAppointmentType from './schedulingAppointmentType';
import {phrList} from './phrListReducer';

import {getEntities} from './entities';

export default combineReducers({
  entities,
  authentication,
  phrList,
  schedulingPatient,
  schedulingSlot,
  schedulingAppointmentType
});

// selectors

export const getFilteredSlots = (state) => {
  const filterDate = moment(getSlotFilterDate(state));
  return state.getIn(["entities", "slots"]).filter(slot => {
    const start = moment(slot.get("start_datetime"));
    return start.diff(filterDate, "days") === 0;
  });
};

export const getSlotFilterDate = (state) =>
  state.getIn(["schedulingSlot", "filterDate"]);
