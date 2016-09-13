import React from 'react';
import {Route, IndexRoute, Router, browserHistory} from 'react-router';
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
import Settings from '../Settings/Settings';
import {Login} from '../Login/Login';

// ????: should this go into constants.js?
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

export function configureRoutes(store) {

  function authTransition(nextState, replace, callback) {
    const state = store.getState();
    const authData = state.get("authentication");

    if (!user.isAuthenticated) {
      replace('/login');
    }

    callback();
  }

  return (
    <Router history={browserHistory}>
      <Route>
        <Route path="/login" component={Login}/>
        <Route path="/" component={App} onEnter={authTransition}>
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
