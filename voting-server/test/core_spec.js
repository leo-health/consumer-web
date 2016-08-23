import {List, Map, fromJS, toJS} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

      it('adds the entries to the satate', () => {
        const state = Map();
        const entries = List.of('Trainspotting', '28 days later');
        const nextState = setEntries(state, entries);
        expect(nextState).to.equal(fromJS({
          entries: ['Trainspotting', '28 days later']
        }));
      })
  });

  describe('next', () => {

    it('moves the next two movies to the vote.pair key', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 days later', 'Sunshine')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        entries: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 days later')
        })
      }));
    });

    it('adds the winning vote back to entries and sets up next vote', () => {
      const state = Map({
        entries: List.of('Sunshine','Millions', '127 Hours'),
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 3,
            '28 days later': 5
          })
        })
      });

      const nextState = next(state);
      expect(nextState).to.equal(Map({
        entries: List.of('127 Hours', '28 days later'),
        vote: Map({
          pair: List.of('Sunshine', 'Millions')
        })
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 3
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Sunshine', 'Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
      }));

    });

    it('ends the vote when there is only one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 5,
            '28 Days Later': 3
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        winners: ['Trainspotting']
      }));

    });

  });

  describe('vote', () => {

    it('creates a tally for the entity being voted for', () => {
      const state = Map({
        entries: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 days later')
        })
      });

      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        entries: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 1
          })
        })
      }));
    });

    it('increments the tally for the entity being voted for', () => {
      const state = Map({
        entries: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 3,
            '28 days later': 5
          })
        })
      });

      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(Map({
        entries: List.of('Sunshine'),
        vote: Map({
          pair: List.of('Trainspotting', '28 days later'),
          tally: Map({
            'Trainspotting': 4,
            '28 days later': 5
          })
        })
      }));
    });
  });

})
