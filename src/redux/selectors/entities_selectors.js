
export function singleEntitySelector(state, entityName, entityID) {
  return state.getIn(["entities", entityName, entityID]);
}
