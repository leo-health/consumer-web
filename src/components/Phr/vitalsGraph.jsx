import React from 'react';
import ReactDOM from 'react-dom';
import styles from './phr.css';
import CSSModules from 'react-css-modules';
import {Line} from 'react-chartjs-2';
import moment from 'moment';

const options = {
  legend: {
    display: false
  },

  elements: {
    line: {
      fill: false,
      backgroundColor: "#FF5F40",
      tension: 0
    },

    point: {
      borderColor: "#FF5F40",
      backgroundColor: "#fff",
      borderWidth: 1,
      hoverRadius: 7,
      hoverBorderWidth: 2,
      radius: 7,
      hitRadius: 10
    }
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
    this.state={ dataType: 'weights', currentVital: this.props.weights[this.props.weights.length - 1 ] }
  }

  switchData(dataType){
    if(dataType === this.state.dataType) return;
    this.setState({ dataType: dataType,  currentVital: this.props[dataType][this.props.weights.length - 1 ]})
  }

  generateData(){
    var vitals = this.props[this.state.dataType];
    var birthDate = moment(this.props.currentPatient.birth_date);
    var convertedVitals = [];
    vitals.forEach(function(vital){
      var age = moment(vital.taken_at).diff(birthDate, 'months', true);
      convertedVitals.push({x: age, y: vital.value})
    });

    return { datasets: [{
      data: convertedVitals,
      pointHoverBackgroundColor: "#FF5F40",
      pointHoverBorderColor: "#FF5F40"
    }] }
  }

  formatTakenAt(){
    var birthDate = this.props.currentPatient.birth_date;
    var diffDuration = moment.duration(moment(this.state.currentVital.taken_at).diff(birthDate));
    if(diffDuration.years() === 0){
      return `${diffDuration.months()} months ${diffDuration.days()} days old`
    }else{
      return `${diffDuration.years()} years ${diffDuration.months()} months old`
    }
  }

  renderActiveVital(vitals) {
    this.setState({
      currentVital: this.props[this.state.dataType][vitals[0]._index]
    })
  }

  render() {
    return (
      <div styleName='vitalGraph'>
        <div styleName='selectionBar' onClick={() => this.switchData('weights')}>WEIGHT</div>
        <div styleName='selectionBar' onClick={() => this.switchData('heights')}>HEIGHT</div>

        <div styleName='dashboard'>
          <p>WEIGHT</p>
          {this.state.currentVital.formatted_value_with_units}
        </div>
        <div styleName='dashboard'>
          <p>TAKEN AT</p>
          {this.formatTakenAt()}
        </div>
        <div styleName='dashboard'>
          <p>PERCENTILE</p>
          {this.state.currentVital.percentile}
        </div>
        <Line data={this.generateData()}
              options={options}
              onElementsClick={this.renderActiveVital.bind(this)}/>
      </div>
    )
  }
}

export default CSSModules(VitalsGraph, styles);
