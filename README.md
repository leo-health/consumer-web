# consumer-web
## Starting in Development
run ```npm start```

## [React CSS Modules](https://github.com/gajus/react-css-modules#development)

### CSS Modules
[CSS Modules](https://github.com/css-modules/css-modules) are a way to automatically namespace class names by importing a specific CSS file for each component. This way, we can assign intuitive class names without fear of namespacing, e.g. ```button``` becomes a valid class name because CSS Modules will automatically namespace it into something more specific.

### React CSS Modules
React CSS Modules component automates loading of CSS Modules using the styleName property, e.g.

```
import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './table.css';

class Table extends React.Component {
    render () {
        return <div styleName='table'>
            <div styleName='row'>
                <div styleName='cell'>A0</div>
                <div styleName='cell'>B0</div>
            </div>
        </div>;
    }
}

export default CSSModules(Table, styles);
```
### Benefits of React CSS Modules:

1. You are not forced to use the camelCase naming convention.
2. There is clear distinction between global CSS and CSS Modules, e.g.

```
<div className='global-css' styleName='local-module'></div>
```

### Conventions
Each component will have its own CSS file in the same folder (if it uses CSS). For example, ```ProfileDropdown.jsx``` imports a stylesheet called ```profile-dropdown.css``` via the import command ```import styles from './profile-dropdown.css'```.

Also note that the export command is changed into ```export default CSSModules(Header, styles);```.

Finally, any specific classes will be specified with the ```styleName``` label; any global classes will continue to be specified using ```className```. To specify a global class, use

```
:global foo {
  ...
}
```

in the ```global.css``` stylesheet.
## [React Router](https://github.com/reactjs/react-router)
Path values are specified in ```index.jsx```, e.g.

```
<Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Recent}/>
    <Route path="/chat" component={Chat}/>
    <Route path="/children" component={Children}/>
    <Route path="/appointment" component={Appointment}/>
    <Route path="/settings" component={Settings}/>
  </Route>
</Router>
```

Here we see the path name listed with the corresponding component that will be rendered when we visit that path.

The routes nested in the parent route (where ```component={App}```) are passed as props, and are rendered in ```App.jsx``` as ```this.props.children```. Consequently, any valid url change will cause the appropriate components to be passed and rendered in place of ```this.props.children```. The Navbar and Header are both rendered outside of this, so they will be consistent across the app.

