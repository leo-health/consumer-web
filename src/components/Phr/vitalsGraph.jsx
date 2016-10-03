import React from 'react';
import ReactDOM from 'react-dom';
import styles from './phr.css';
import CSSModules from 'react-css-modules';
import {Line} from 'react-chartjs';

class VitalsGraph extends React.Component {
  constructor(props) {
    super(props);
    //this.state={ dataType: 'weights' }
  }

  switchData(dataType){
    if(dataType === this.state.dataType) return;
    this.setState({ dataType: dataType })
  }

  lineData(){
    var data = this.props[this.state.dataType];
    data.forEach(function(entry){
      height: entry.formatted_value_with_units
    })
  }


  chartData(){
    return {
      datasets: [{
        label: 'Scatter Dataset',
        data: [{
          x: -10,
          y: 0
        }, {
          x: 0,
          y: 10
        }, {
          x: 10,
          y: 5
        }]
      }]
    }
  }

  chartOptions(){
    return {q
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom'
        }]
      }
    }
  }
  render() {
    //<p styleName='sideNote'>{vital.formatted_value_with_units}, {vital.percentile}th percentile</p>
    return (
      <div styleName='vitalGraph'>
        <div styleName='selectionBar' onClick={this.switchData}>WEIGHT</div>
        <div styleName='selectionBar' onClick={this.switchData}>HEIGHT</div>

        <div styleName='dashboard'>
          WEIGHT
        </div>
        <div styleName='dashboard'>
          TAKEN AT
        </div>
        <div styleName='dashboard'>
          PERCENTILE
        </div>
        <Line  data={this.chartData()} options={this.chartOptions()}/>
      </div>
    )
  }
}

export default CSSModules(VitalsGraph, styles);
