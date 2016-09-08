import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import reducer from './reducers/reducer';

export default function() {
  return createStore(
    reducer,
    applyMiddleware(
      thunkMiddleware,
      createLogger()
    )
  )
}
