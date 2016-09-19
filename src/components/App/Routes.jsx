import React from 'react';
import {Route, IndexRoute, Router, browserHistory} from 'react-router';
import {loadCachedAuthToken} from '../Login/login_action_creators';
import App from './App';
import Home from './Home';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Recent from '../Recent/Recent';
import Chat from '../Chat/Chat';
import Children from '../Children/Children'
import Appointment from '../Appointment/Appointment';
import {Scheduler} from '../Appointment/Scheduler/Scheduler';
import {PatientListContainer} from '../Appointment/PatientList/PatientList';
import {AppointmentTypeListContainer} from '../Appointment/AppointmentTypeList/AppointmentTypeList';
import {SlotListContainer} from '../Appointment/SlotList/SlotList';
import {Settings} from '../Settings/Settings';
import {Login} from '../Login/Login';
import Phr from '../Phr/phr';

export const routeURLs = {
  index: "/",
  login: "/login",
  chat: "/chat",
  appointment: "/appointment",
  appointment_choose_patient: "/appointment/patients",
  appointment_choose_appointment_type: "/appointment/appointment_types",
  appointment_choose_slot: "/appointment/slots", // TODO: should fail if state is not ready to choose a slot
  children: "/children",
  settings: "/settings"
};

function authSelector(state) {
  return state.getIn(["authentication", "token"]);
}

// TODO: break into other file, something like authHelper.js
//function authTransition(store) {
//  return function(nextState, replace, callback) {
//    const inMemoryAuthToken = authSelector(store.getState());
//    if (!inMemoryAuthToken) {
//      store.dispatch(loadCachedAuthToken());
//    }
//
//    const onDiskAuthToken = authSelector(store.getState());
//    if (!onDiskAuthToken) {
//      replace('/login');
//    }
//    callback();
//  }
//}
//<Route path="/" component={App} onEnter={authTransition(store)}>
export function configureRoutes(store) {
  return (
    <Router history={browserHistory}>
      <Route>
        <Route path="/login" component={Login}/>
        <Route path="/" component={App}>
          <Route path="phr" component={Phr}>
          </Route>
          <Route component={Home}>
            <IndexRoute/>
            <Route path="chat" component={Chat}/>
            <Route path="appointment" component={Appointment}>
              <IndexRoute component={Scheduler}/>
              <Route path="patients" component={PatientListContainer}/>
              <Route path="appointment_types" component={AppointmentTypeListContainer}/>
              <Route path="slots" component={SlotListContainer}/>
            </Route>
          </Route>
          <Route path="children" component={Children}/>
          <Route path="settings" component={Settings}/>
        </Route>
      </Route>
    </Router>
  );
}
