import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import reducer from './reducers';

export function configureStore() {
  return createStore(
    reducer,
    applyMiddleware(
      thunkMiddleware,
      createLogger()
    )
  );
}
