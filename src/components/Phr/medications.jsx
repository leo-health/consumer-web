import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class Medications extends React.Component {
  renderMedications() {
    if(!this.props.medications) return;
    var medications = this.props.medications;
    if( medications.length > 0 ){
      medications = medications.map(function(medication, i){
        return (
          <div styleName='medication'>
            <div styleName='allergen'>{medication.allergen}</div>
            <div styleName='severity'>{medication.severity}</div>
            <div styleName='note'>{medication.note}</div>
          </div>
        )
      })
    }else{
      medications =  <p>No active medication</p>
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
