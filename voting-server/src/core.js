const Immutable = require('immutable');
const List = Immutable.List;
const Map = Immutable.Map;

function getWinners(tally) {
  // example only works for 2 tallies
  // if (!vote) return [];
  // const [a, b] = vote.get('pair');
  // const aVotes = vote.getIn(['tally', a], 0);
  // const bVotes = vote.getIn(['tally', b], 0);
  // if      (aVotes > bVotes)  return [a];
  // else if (aVotes < bVotes)  return [b];
  // else                       return [a, b];

  // let keys = [];
  // for (const k of tally.keys()) { keys.push(k) }

  let keys = Array.from(tally.keys());

  return keys.reduce(function(currentWinners, nextEntry) {

    if (currentWinners.isEmpty()) {
      return List.of(nextEntry);
    }

    const winningTally = tally.get(currentWinners.get(0));
    const nextTally = tally.get(nextEntry);
    if (nextTally == winningTally) {
      return currentWinners.push(nextEntry);
    } else if (nextTally > winningTally) {
      return List.of(nextEntry);
    }

    return currentWinners;
  }, new List());
}

module.exports = {

  INITIAL_STATE: Map(),

  setEntries: function(state, entries) {
    return state.set('entries', List(entries));
  },

  next: function(state) {

    let tally = state.getIn(['vote','tally'])
    if (!tally) { tally = Map() }
    const winners = getWinners(tally);

    /*
    We could have just returned Map({winner: entries.first()}) here. But instead we still take the old state as the starting point and explicitly remove 'vote' and 'entries' keys from it. The reason for this is future-proofing: At some point we might have some unrelated data in the state, and it should pass through this function unchanged. It is generally a good idea in these state transformation functions to always morph the old state into the new one instead of building the new state completely from scratch.
    */
    let entries = state.get("entries");
    if (entries.isEmpty()) {
      return state
        .remove("vote")
        .remove("entries")
        .set("winners", winners);
    }

    entries = entries.concat(winners);
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });

    // return state
    //   .set('entries', state.get('entries').slice(2))
    //   .set('vote', Immutable.Map({
    //     pair: state.get('entries').slice(0,2)
    //   }));
    //
    // return Map({
    //   vote: Map({
    //     pair: state.get('entries').slice(0,2)
    //   }),
    //   entries: state.get('entries').slice(2)
    // });
  },

  vote: function(voteState, entry) {

    /*
    Using updateIn makes this pleasingly succinct.
    What the code expresses is
    "reach into the nested data structure path ['vote', 'tally', 'Trainspotting'],
    and apply this function there.
    If there are keys missing along the path,
    create new Maps in their place.
    If the value at the end is missing, initialize it with 0".
    */
    let state = voteState || Map();
    return state.updateIn(
      ['tally', entry],
      0,
      tally => tally + 1
    );

    // const votes = state.get('vote');
    //
    // let tally = votes.get('tally')
    // if (!tally) { tally = Map() }
    //
    // let numVotes = tally.get(entry);
    // if (!numVotes) { numVotes = 0 }
    //
    // return state.set('vote', votes.set('tally', tally.set(entry, numVotes+1)))
  }
}
