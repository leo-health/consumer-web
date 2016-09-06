import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

// Redux
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import reducer from './redux/reducers/reducer';
import {setState} from './redux/actions/action_creators';

// Components
import {Scheduler} from './components/Scheduler/Scheduler'
import {PatientListContainer} from './components/PatientList/PatientList'
import {AppointmentTypeList} from './components/AppointmentTypeList/AppointmentTypeList'
import {SlotList} from './components/SlotList/SlotList'

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
)

store.dispatch(setState({
    patientListState: {
      isLoading: false,
      patientList: [
        {id: 1, name: "Johnny"},
        {id: 2, name: "Appleseed"}
      ],
      selectedPatient: {name: "Johnny"}
    }
  })
)

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
