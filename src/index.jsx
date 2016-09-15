import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {configureRoutes} from './components/App/Routes'
import {configureStore} from './redux/configureStore'

const store = configureStore();
const routes = configureRoutes(store);

ReactDOM.render(
  <Provider {...{store}}>
    {routes}
  </Provider>,
  document.getElementById("app")
);
