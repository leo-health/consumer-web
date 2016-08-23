const redux = require('redux');
const reducer = require('./reducer').default; // import reducer from './reducer';

module.exports = function makeStore() {
  return redux.createStore(reducer);
};
