import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';
import VitalsTable from './vitalsTable';
import VitalsGraph from './vitalsGraph';

class Vitals extends React.Component {
  renderVitals(heights, weights) {
    if ( heights.length === 0 && weights.length === 0 ){
      return <p styleName='emptyText'>No Vitals Measurements</p>
    } else{
     return <VitalsTable height={heights[0]} weight={weights[0]}/>
    }
  }


  tableOrGraph() {
    if(!this.props.heights || !this.props.weights) return;
    const {heights, weights} = this.props;
    if(heights.length > 1 || weights.length > 1){
      return <VitalsGraph heights={heights} weights={weights}/>
    }else{
      return (
        <div>
          <p styleName='sectionTitle'>RECENT VITALS</p>
          <div styleName='greyLine'></div>
          {this.renderVitals(heights, weights)}
        </div>
      )
    }
  }

  render() {
    return (
      <div>{this.tableOrGraph()}</div>
    )
  }
}

export default CSSModules(Vitals, styles);
