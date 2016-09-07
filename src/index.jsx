import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory
} from 'react-router';

// Redux
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import reducer from './redux/reducers/reducer';
import {setState} from './redux/actions/action_creators';

// Components
import App from './components/App/App';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Recent from './components/Recent/Recent';
import Chat from './components/Chat/Chat';
import Children from './components/Children/Children'
import Appointment from './components/Appointment/Appointment';
import Settings from './components/Settings/Settings';

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

ReactDOM.render(
  <Provider {...{store}}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Recent}/>
        <Route path="/chat" component={Chat}/>
        <Route path="/children" component={Children}/>
        <Route path="/appointment" component={Appointment}>
          <IndexRoute component={Scheduler}/>
          <Route path="/patients" component={PatientListContainer}/>
        </Route>
        <Route path="/settings" component={Settings}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("app")
)
