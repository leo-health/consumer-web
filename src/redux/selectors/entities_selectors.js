export function singleEntitySelector(state, entityName, entityID) {
  return state.getIn(["entities", entityName, entityID]);
}

export function allEntitiesSelector(state, entityName) {
  return state.getIn(["entities", entityName]);
}
