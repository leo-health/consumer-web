import React from 'react';
import AuthWrapper from './AuthWrapper';

const App = ({children}) =>
<div className="container">
  {children}
</div>;

function authSelector(state) {
  return state.get("authentication");
}

export default AuthWrapper(App, authSelector);
