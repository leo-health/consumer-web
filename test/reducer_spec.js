import {fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe("reducer", () => {

  describe("handles SET_STATE", () => {

    const serverState = {
      vote: {
        pair: [
          "Trainspotting",
          "28 days later"
        ],
        tally: {
          "Trainspotting": 5,
          "28 days later": 3
        }
      }
    };

    const reduceAndExpect = function(state, action) {
      const mergedState = reducer(state, action);
      expect(mergedState).to.equal(fromJS(serverState));
    };

    it("handles empty map initialState", () => {
        const state = fromJS({});
        const action = {type: "SET_STATE", payload: serverState};
        reduceAndExpect(state, action);
    });

    it("handles undefined initialState", () => {
        const action = {type: "SET_STATE", payload: serverState};
        reduceAndExpect(undefined, action);
    });

    it("handles immutable payload", () => {
        const state = fromJS({});
        const action = {type: "SET_STATE", payload: fromJS(serverState)};
        reduceAndExpect(state, action);
    });

    it('removes hasVoted on SET_STATE if pair changes', () => {
      const initialState = fromJS({
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {Trainspotting: 1}
        },
        votedFor: 'Trainspotting'
      });
      const action = {
        type: 'SET_STATE',
        payload: {
          vote: {
            pair: ['Sunshine', 'Slumdog Millionaire']
          }
        }
      };
      const nextState = reducer(initialState, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Sunshine', 'Slumdog Millionaire']
        }
      }));
    });

  });

  describe("handles VOTE", () => {

    it('handles VOTE by setting votedFor', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 days later'],
          tally: {Trainspotting: 1}
        }
      });
      const action = {type: 'VOTE', payload: {entry: 'Trainspotting'}};
      const nextState = reducer(state, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Trainspotting', '28 days later'],
          tally: {Trainspotting: 1}
        },
        votedFor: 'Trainspotting'
      }));
    });

    it('does not set hasVoted for VOTE on invalid entry', () => {
      const state = fromJS({
        vote: {
          pair: ['Trainspotting', '28 days later'],
          tally: {Trainspotting: 1}
        }
      });
      const action = {type: 'VOTE', payload: {entry: 'Sunshine'}};
      const nextState = reducer(state, action);

      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Trainspotting', '28 days later'],
          tally: {Trainspotting: 1}
        }
      }));

    });

  });

});
