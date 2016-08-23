import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe("reducer", () => {

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it("handles SET_ENTRIES", () => {

    const state = Map();
    const action = {type:"SET_ENTRIES", entries:["Trainspotting"]}
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      entries: ["Trainspotting"]
    }));

  });

  it("handles NEXT", () => {

    const state = fromJS({
      entries: ["Trainspotting", "28 days later", "Sunshine"]
    });
    const action = {type:"NEXT"};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ["Trainspotting", "28 days later"]
      },
      entries: ["Sunshine"]
    }));

  });

  it("handles VOTE", () => {

    const state = fromJS({
      vote: {
        pair: ["Trainspotting", "28 days later"]
      },
      entries: ["Sunshine"]
    });

    const action = {type:"VOTE", entry: "Trainspotting"};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ["Trainspotting", "28 days later"],
        tally: {
          "Trainspotting": 1
        }
      },
      entries: ["Sunshine"]
    }));

  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winners: ['Trainspotting']
    }));
  });

});
