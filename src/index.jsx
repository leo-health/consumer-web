import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Recent from './components/Recent/Recent';
import Chat from './components/Chat/Chat';
import Children from './components/Children/Children'
import Appointment from './components/Appointment/Appointment';
import Settings from './components/Settings/Settings';
import './stylesheets/main.css';


// BabelLoaderError: SyntaxError: 'import' and 'export' may only appear at the top level
// import App from './components/App'

const App = require("./components/App").default;
ReactDOM.render(
    <div>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Recent}/>
          <Route path="/chat" component={Chat}/>
          <Route path="/children" component={Children}/>
          <Route path="/appointment" component={Appointment}/>
          <Route path="/settings" component={Settings}/>
        </Route>
      </Router>
    </div>,
  document.getElementById("app")
)

