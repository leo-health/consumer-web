import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {fromJS} from 'immutable';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import remoteActionMiddleware from './remote_action_middleware';
import {setState} from './action_creators';

// BabelLoaderError: SyntaxError: 'import' and 'export' may only appear at the top level
// import App from './components/App'

const store = createStore(reducer)

ReactDOM.render(
  <Provider {...{store}}>
    <Router history={hashHistory}>
      <Route path="/" component={Scheduler} />
      <Route path="/patients" component={PatientsList} />
      <Route path="/appointment_types" component={AppointmentTypeList} />
      <Route path="/slots" component={SlotList} />
    </Router>
  </Provider>,
  document.getElementById("app")
)
