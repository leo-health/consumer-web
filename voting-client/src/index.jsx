import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {fromJS} from 'immutable';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';


// LEO



// TUTORIAL ON
import io from 'socket.io-client';
import remoteActionMiddleware from './remote_action_middleware';
import {setState} from './action_creators';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

// BabelLoaderError: SyntaxError: 'import' and 'export' may only appear at the top level
// import App from './components/App'

var tutorial_on = false;

if (!tutorial_on) {




    const store = createStore(reducer)

    const App = require("./components/App").default;
    ReactDOM.render(
      <Provider {...{store}}>
        <Router history={hashHistory}>
          <Route path="/" component={App} />
        </Router>
      </Provider>,
      document.getElementById("app")
    )








} else {

  // Let's connect to one that we assume to be on the same host as our client, in port 8090 (matching the port we used on the server):
  const socket = io(`${location.protocol}//${location.hostname}:8090`);
  socket.on("state", state => store.dispatch(setState(state)));

  const createStoreWithMiddleware = applyMiddleware(
    remoteActionMiddleware(socket)
  )(createStore);
  const store = createStoreWithMiddleware(reducer);
  // for some reason this creates an infinite loop of calling the middleware function
  // has something to do with using the `store` variable in the closure before defining it.
  // what's a good pattern here?
  // const store = applyMiddleware(remoteActionMiddleware(socket))(createStore)(reducer);

  const App = (props) => props.children;
  const routes = <Route component={App}>
    <Route path="/results" component={ResultsContainer} />
    <Route path="/" component={VotingContainer} />
  </Route>;
  ReactDOM.render(
    <Provider {...{store}}>
      <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById("app")
  );






}
