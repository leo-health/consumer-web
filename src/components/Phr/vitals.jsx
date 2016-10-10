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
      return <VitalsTable height={heights[0]}
                          weight={weights[0]}
                          convertPercentile={this.convertPercentile}/>
    }
  }

  tableOrGraph() {
    if(!this.props.heights || !this.props.weights) return;
    const {heights, weights} = this.props;
    if(heights.length > 1 || weights.length > 1){
      return <VitalsGraph heights={heights}
                          weights={weights}
                          convertPercentile={this.convertPercentile}
                          currentPatient={this.props.currentPatient}/>
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

  convertPercentile(percentile){
    percentile = percentile % 10;
    switch (percentile){
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  render() {
    return (
      <div>{this.tableOrGraph()}</div>
    )
  }
}

export default CSSModules(Vitals, styles);
