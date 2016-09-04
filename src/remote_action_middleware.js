export default store => next => action => {
  console.log("middleware applied");
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
