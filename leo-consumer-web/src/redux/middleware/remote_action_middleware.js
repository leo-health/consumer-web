export default socket => store => next => action => {
  console.log(`action dispatched ${action.type}`);
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  return next(action);
}

// TODO: learn more about this. how does scope work here?
// same as
// export default function(store) {
//   return function(next) {
//     return function(action) {
//       console.log("middleware applied");
//       return next(action);
//     }
//   }
// }
