import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Chat from './components/Chat/Chat';
import './stylesheets/main.css';


// BabelLoaderError: SyntaxError: 'import' and 'export' may only appear at the top level
// import App from './components/App'

const App = require("./components/App").default;
ReactDOM.render(
    <div>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="/chat" component={Chat} />
        </Route>
      </Router>
    </div>,
  document.getElementById("app")
)

