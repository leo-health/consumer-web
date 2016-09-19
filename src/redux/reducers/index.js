// external modules
import {Map} from 'immutable';
import {combineReducers} from 'redux-immutable';
import moment from 'moment';

// reducers
import authentication from './authentication';
import entities from './entities';
import schedulingSlot from './schedulingSlot';
import schedulingPatient from './schedulingPatient';
import schedulingAppointmentType from './schedulingAppointmentType';
import {phrList} from './phrListReducer';

// selectors
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
  const allSlots = state.getIn(["entities", "slots"]);
  const filterDate = moment(getSlotFilterDate(state));

  if (!filterDate || !allSlots) {
    return allSlots.valueSeq().toList();
  }

  return allSlots.filter(slot => {
    const start = moment(slot.get("start_datetime"));
    return start.diff(filterDate, "days") === 0;
  });
};

export const getSlotFilterDate = (state) =>
  state.getIn(["schedulingSlot", "filterDate"]);
