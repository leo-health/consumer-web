import {fromJS, Map} from 'immutable';

function setState(state, newState) {
  if (!newState) { return state }


  const oldPair = state.getIn(["vote", "pair"]);
  const newPair = newState.getIn(["vote", "pair"]);

  let nextState = state;
  if (oldPair && !oldPair.equals(newPair)) {
    nextState = resetVote(state);
  }

  return nextState.merge(newState);
}

function vote(state, entry) {
  // only allow a vote for an entry in the pair
  const pair = state.getIn(["vote", "pair"]);

  if (!pair.includes(entry)) {
    return state;
  }

  const votedFor = fromJS({votedFor: entry});

  console.log(votedFor);
  console.log(state);
  console.log(state.merge(votedFor));
  return state.merge(votedFor);
}

function resetVote(state) {
  return state.delete("votedFor");
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
