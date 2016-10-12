// external modules
import {Map} from 'immutable';
import {combineReducers} from 'redux-immutable';
import moment from 'moment';

// reducers & selectors
import authentication from './authentication';
import entities, * as fromEntities from './entities';
import schedulingSlot, * as fromSchedulingSlot from './schedulingSlot';
import schedulingPatient from './schedulingPatient';
import schedulingAppointmentType from './schedulingAppointmentType';
import messaging from './messaging';
import {phrList} from './phrListReducer';

export default combineReducers({
  entities,
  authentication,
  phrList,
  schedulingPatient,
  schedulingSlot,
  schedulingAppointmentType,
  messaging
});

export const getGroupedSlotsByDate = state => {
  const slotIDs = fromSchedulingSlot.getGroupedSlotIDsByDate(state.get("schedulingSlot"));
  return slotIDs.mapEntries(([date, slotIDs]) => {
    return [date, slotIDs.map(slotID => {
      return fromEntities.getById(state, "slots", slotID)
    })]
  });
};
