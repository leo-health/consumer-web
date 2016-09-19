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
