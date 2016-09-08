import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './App';
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

export default
<Route path="/" component={App}>
  <IndexRoute component={Recent}/>
  <Route path="/chat" component={Chat}/>
  <Route path="/children" component={Children}/>
  <Route path="/appointment" component={Appointment}>
    <IndexRoute component={Scheduler}/>
    <Route path="patients" component={PatientListContainer}/>
    <Route path="appointment_types" component={AppointmentTypeListContainer}/>
    <Route path="slots" component={SlotListContainer}/>
  </Route>
  <Route path="/settings" component={Settings}/>
</Route>;
