
// TODO: refactor to use constants
export const ActionTypes = {
  SET_STATE: 'SET_STATE'
}

export function setState(state) {
  return {
    type: ActionTypes.SET_STATE,
    payload: state
  };
}
