import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class VitalsGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div styleName='vitalGraph'>
          <div styleName='selectionBar'>WEIGHT</div>
          <div styleName='selectionBar'>HEIGHT</div>

          <div styleName='dashboard'>HEIGHT</div>
          <div styleName='dashboard'>HEIGHT</div>
          <div styleName='dashboard'>HEIGHT</div>

          {this.props.height}
        </div>
    )
  }
}

export default CSSModules(VitalsGraph, styles);
