import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {fromJS} from 'immutable';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './redux/reducers/reducer';
import remoteActionMiddleware from './redux/middlewares/remote_action_middleware';
import {setState} from './redux/actions/action_creators';

import {Scheduler} from './components/Scheduler/Scheduler'
import {PatientListContainer} from './components/PatientList/PatientList'
import {AppointmentTypeList} from './components/AppointmentTypeList/AppointmentTypeList'
import {SlotList} from './components/SlotList/SlotList'

// BabelLoaderError: SyntaxError: 'import' and 'export' may only appear at the top level
// import App from './components/App'

const store = createStore(reducer)

store.dispatch({
  type: "SET_STATE",
  payload: {
    patientListState: {
      isLoading: false,
      patientList: [
        {name: "Johnny"},
        {name: "Appleseed"}
      ],
      selectedPatient: {name: "Johnny"}
    }
  }
})

ReactDOM.render(
  <Provider {...{store}}>
    <Router history={hashHistory}>
      <Route path="/" component={Scheduler} />
      <Route path="/patients" component={PatientListContainer} />
      <Route path="/appointment_types" component={AppointmentTypeList} />
      <Route path="/slots" component={SlotList} />
    </Router>
  </Provider>,
  document.getElementById("app")
)
