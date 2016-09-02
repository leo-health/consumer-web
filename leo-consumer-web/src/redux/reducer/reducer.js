import {fromJS, Map} from 'immutable';

function setState(state, newState) {
  if (!newState) { return state }
  return resetVoteIfPairChanged(state, newState).merge(newState);
}

function resetVoteIfPairChanged(state, newState) {
  const [oldPair, newPair] = [state, newState].map(
    (m)=>m.getIn(["vote", "pair"])
  );
  let pairChanged = oldPair && !oldPair.equals(newPair);
  if (pairChanged) { return state.delete("votedFor") }
  return state;
}

function vote(state, entry) {

  // only allow a vote for an entry in the pair
  const pair = state.getIn(["vote", "pair"]);
  if (!pair.includes(entry)) {
    return state;
  }

  // increment the tally
  let nextState = state.updateIn(["vote", "tally", entry], (count)=>count+1, 0);

  const votedFor = fromJS({votedFor: entry});
  nextState = nextState.merge(votedFor);

  return nextState
}

function reducer(state = Map(), action) {

  switch (action.type) {
    case "SET_STATE":
      return setState(state, fromJS(action.payload));
    case "VOTE":
      return vote(state, fromJS(action.payload.entry));
  }
  return state
}

export default reducer;
