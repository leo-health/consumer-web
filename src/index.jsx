import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './components/App/Routes'
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore'

const store = configureStore();

ReactDOM.render(
  <Provider {...{store}}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById("app")
);
