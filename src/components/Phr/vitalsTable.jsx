import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class VitalsTable extends React.Component {
  renderVital(title){
    var vital = this.props[title.toLowerCase()];
    if(vital){
      return(
        <div styleName='phrSection'>
          <div styleName='title'>{title}</div>
          <div styleName='sideNote'>{vital.formatted_value_with_units}, {vital.percentile}th percentile</div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderVital('Weight')}
        {this.renderVital('Height')}
      </div>
    )
  }
}

export default CSSModules(VitalsTable, styles);
