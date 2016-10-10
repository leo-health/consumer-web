import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class VitalsTable extends React.Component {
  renderVital(title){
    var vital = this.props[title.toLowerCase()];
    var convert = this.props.convertPercentile;

    if(vital){
      return(
        <div styleName='phrSection'>
          <p styleName='title'>{title}</p>
          <p styleName='sideNote'>{vital.formatted_value_with_units}, {vital.percentile}{convert(vital.percentile)} percentile</p>
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
