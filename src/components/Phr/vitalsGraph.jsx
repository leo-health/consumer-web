import React from 'react';
import ReactDom from 'react-dom';
import styles from './phr.css';
import CSSModules from 'react-css-modules';
import {Line} from 'react-chartjs-2';
import moment from 'moment';
import classnames from 'classnames';

const options = {
  legend: {
    display: false
  },

  tooltips: {
    enabled: false
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
      hitRadius: 100
    }
  },

  scales: {
    xAxes: [{
      display: true,
      type: "linear",
      position: "bottom",
      scaleLabel: {
        display: true,
        labelString: 'AGE',
        fontStyle: 'bold',
        fontSize: 20
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
        labelString: 'HEIGHT',
        fontStyle: 'bold',
        fontSize: 20
      },
      ticks: {
        display: false
      }
    }]
  }
};

const cx = classnames.bind(styles);

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

    return {
      datasets: [{
        data: convertedVitals,
        pointHoverBackgroundColor: "#FF5F40",
        pointHoverBorderColor: "#FF5F40"
      }]
    }
  }

  formatTakenAt(){
    var birthDate = this.props.currentPatient.birth_date;
    var diffDuration = moment.duration(moment(this.state.currentVital.taken_at).diff(birthDate));
    if(diffDuration.years() === 0){
      return `${diffDuration.months()} months ${diffDuration.days()} days`
    }else{
      return `${diffDuration.years()} years ${diffDuration.months()} months`
    }
  }

  renderActiveVital(vitals) {
    this.setState({
      currentVital: this.props[this.state.dataType][vitals[0]._index]
    })
  }

  generateVitalName(vital){
    if(vital.includes("lbs")){
      return <p>WEIGHT</p>
    }else if(vital.includes("months")){
      return <p>TAKEN AT</p>
    }else{
     return <p>HEIGHT</p>
    }
  }

  renderWeight(vital){
    var vitalArr = vital.split(" ");
    if(vitalArr.length === 4){
     return (
       <div styleName='dashboard'>
         <div styleName='item'>
           <div styleName='left'>
             {vitalArr[0]}
           </div>
           <div styleName='right'>
             <p>{vitalArr[1]}</p>
             <p>{vitalArr[2]} {vitalArr[3]}</p>
           </div>
         </div>
         {this.generateVitalName(vital)}
       </div>
     )
    }else{
      return (
        <div styleName='dashboard'>
          <div styleName='left'>
            {vitalArr[0]}
          </div>
          <div styleName='right'>
            {vitalArr[1]}
          </div>
          {this.generateVitalName(vital)}
        </div>
      )
    }
  }

  //handleClick(){
  //}
  //
  //componentDidMount(){
  //  var canvas = this.refs.chart.chart_instance.chart.canvas
  //
  //}

  render() {
    return (
      <div styleName='vitalGraph'>
        <div styleName={cx('selectionBar', { active: this.state.dataType === 'weights' })} onClick={() => this.switchData('weights')}>WEIGHT</div>
        <div styleName={cx('selectionBar', { active: this.state.dataType === 'heights' })} onClick={() => this.switchData('heights')}>HEIGHT</div>
        {this.renderWeight(this.state.currentVital.formatted_value_with_units)}
        {this.renderWeight(this.formatTakenAt())}
        <div styleName='dashboard'>
          <div styleName='item'>
            <div styleName='left'>
              {this.state.currentVital.percentile}{this.props.convertPercentile(this.state.currentVital.percentile)}
            </div>
          </div>
          <p>PERCENTILE</p>
        </div>
        <Line data={this.generateData()}
              options={options}
              ref='chart'
              onClick={this.handleClick}
              onElementsClick={this.renderActiveVital.bind(this)}/>
      </div>
    )
  }
}


export default CSSModules(VitalsGraph, styles, {allowMultiple: true} );

/*var activePoint = scatterChart.getElementAtEvent(evt);*/
/*var selectedPoint = activePoint[0];*/
/*selectedPoint.custom = this.selectedPoint.custom || {};*/
/*selectedPoint.custom.backgroundColor = 'rgba(128,128,128,1)';*/
/*selectedPoint.custom.radius = 7;*/
