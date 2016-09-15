import React from 'react';
import AuthWrapper from './AuthWrapper';

const App = ({children}) =>
<div className="container">
  {children}
</div>;

export default AuthWrapper(App, state=>state.get("authentication"));
