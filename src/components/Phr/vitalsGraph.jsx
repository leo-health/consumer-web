import React from 'react';
import ReactDOM from 'react-dom';
import styles from './phr.css';
import CSSModules from 'react-css-modules';
import {Line} from 'react-chartjs-2';

const data = {
  datasets: [{
    fill: false,
    lineTension: 0,
    backgroundColor: "#FF5F40",
    pointBorderColor: "#FF5F40",
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 7,
    pointHoverBackgroundColor: "#FF5F40",
    pointHoverBorderColor: "#FF5F40",
    pointHoverBorderWidth: 2,
    pointRadius: 7,
    pointHitRadius: 10,
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
};

const options = {
  legend: {
    display: false
  },

  scales: {
    xAxes: [{
      display: true,
      type: "linear",
      position: "bottom",
      scaleLabel: {
        display: true,
        labelString: 'AGE'
      },
      ticks: {
        display: false
      },
      gridLines:{
        display: false
      }
    }],

    yAxes: [{
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'HEIGHT'
      },
      ticks: {
        display: false
      }
    }]
  }
};

class VitalsGraph extends React.Component {
  constructor(props) {
    super(props);
    //this.state={ dataType: 'weights' }
  }

  switchData(dataType){
    if(dataType === this.state.dataType) return;
    this.setState({ dataType: dataType })
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
        <Line data={data} options={options}/>
      </div>
    )
  }
}

export default CSSModules(VitalsGraph, styles);
