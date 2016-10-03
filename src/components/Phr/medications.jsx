import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class Medications extends React.Component {
  renderMedications() {
    if(!this.props.medications) return;
    var medications = this.props.medications;
    if( medications.length === 0 ){
      medications =  <p styleName='emptyText'>No active medication</p>
    }else{
      medications = medications.map(function(medication, i){
        return (
          <div styleName='phrSection' key={i}>
            <p styleName='title'>{medication.medication}</p>
            <p styleName='sideNote'>{medication.sig}</p>
          </div>
        )
      })
    }
    return medications
  }

  render() {
    return (
      <div>
        <p styleName='sectionTitle'>MEDICATIONS</p>
        <div styleName='greyLine'></div>
        {this.renderMedications()}
      </div>
    )
  }
}

export default CSSModules(Medications, styles);
