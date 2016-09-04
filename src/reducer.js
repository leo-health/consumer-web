import {fromJS, Map} from 'immutable';

function setState(state, newState) {
  if (!newState) { return state }
  let nextState = state;

  const [oldPair, newPair] = [state, newState]
    .map((m)=>m.getIn(["vote", "pair"]));
  let pairChanged = oldPair && !oldPair.equals(newPair);
  if (pairChanged) { nextState = nextState.delete("votedFor") }

  return nextState.merge(newState);
}

function vote(state, entry) {

  // only allow a vote for an entry in the pair
  const pair = state.getIn(["vote", "pair"]);
  if (!pair.includes(entry)) {
    return state;
  }

  // increment the tally
  let nextState = state.updateIn(["vote", "tally"], (tally)=>tally.update(entry, (count)=>count+1), 0);

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


// is this right to do?
// function reducer(state = Map(), action) {
//   const actions = {
//     "SET_STATE": setState,
//     "VOTE": vote
//   };
//   // can I do this in one line?
//   const actionFn = actions[action.type];
//   if (actionFn) { return call(actionFn, state, action.payload); }
//   return state
// }

export default reducer;
