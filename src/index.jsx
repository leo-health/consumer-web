import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import Header from './components/header/Header'
import Navbar from './components/navbar/Navbar'


// BabelLoaderError: SyntaxError: 'import' and 'export' may only appear at the top level
// import App from './components/App'

const App = require("./components/App").default;
ReactDOM.render(
    <div>
      <Header/>
      <Navbar/>
      <Router history={hashHistory}>
        <Route path="/" component={App} />
      </Router>
    </div>,
  document.getElementById("app")
)

