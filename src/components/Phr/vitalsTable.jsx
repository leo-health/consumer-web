import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class VitalsTable extends React.Component {
  renderWeight(){
    var weight = this.props.weight;
    if(weight){
      return(
        <div styleName='phrSection'>
          <div styleName='title'>Weight</div>
          <div styleName='sideNote'>{weight.formatted_value_with_units}, {weight.percentile}th percentile</div>
        </div>
      )
    }
  }

  renderHeight(){
    var height = this.props.height;
    if(height){
      return(
        <div styleName='phrSection'>
          <div styleName='title'>Height</div>
          <div styleName='sideNote'>{height.formatted_value_with_units}, {height.percentile}th percentile</div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderWeight()}
        {this.renderHeight()}
      </div>
    )
  }
}

export default CSSModules(VitalsTable, styles);
