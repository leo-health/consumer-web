import {createSelector} from 'reselect';
import {getAllEntitiesList} from 'redux/reducers/entities';
import {Map, OrderedMap, List} from 'immutable';
import moment from 'moment';

// TODO: refactor reducers to include default state for all expected entities
export const getAllSlotsList = getAllEntitiesList("slots");

export const getAllSlotsListSorted = createSelector(getAllSlotsList, slots=>slots.sort());

export const getSlotsGroupedByDate = createSelector(
  getAllSlotsListSorted,
  slots => {
    return slots.reduce((slotsGroupedByDate, slot) => {
      return slotsGroupedByDate.update(
        moment(slot.get("start_datetime")).startOf("day").format(),
        List(),
        slotsForDate => slotsForDate.push(slot)
      );
    }, OrderedMap());
  }
);

export const getSlotDatesGroupedByWeek = createSelector(
  getSlotsGroupedByDate,
  slotsGroupedByDate => {
    return slotsGroupedByDate.keySeq().reduce((slotDatesGroupedByWeek, slotDate) => {
      return slotDatesGroupedByWeek.update(
        moment(slotDate).startOf("week").format(),
        List(),
        slotDates => slotDates.push(slotDate)
      );
    }, OrderedMap());
  }
);

export const getSlotWeeks = createSelector(
  getSlotDatesGroupedByWeek,
  slotDatesGroupedByWeek => slotDatesGroupedByWeek.keySeq().toList()
);

// We don't actually need this at the moment, but it could be a useful concept later
// TODO: implement a generic combineSelectors method that works like combineReducers
// export default createSelector(
//   [getSlotDatesGroupedByWeek, getSlotsGroupedByDate],
//   (slotDatesGroupedByWeek, slotsGroupedByDate) => ({
//     slotDatesGroupedByWeek,
//     slotsGroupedByDate
//   })
// );
