export function authenticationTokenSelector(state) {
  return state.getIn(["authentication","token"]);
}
