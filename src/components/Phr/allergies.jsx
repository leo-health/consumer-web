import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class Allergies extends React.Component{
  renderAllergies() {
    if(!this.props.allergies) return;
    var allergies = this.props.allergies;
    if( allergies.length > 0 ){
      allergies = allergies.map(function(allergy, i){
        return (
          <div styleName='allergy'>
            <div styleName='allergen'>{allergy.allergen}</div>
            <div styleName='severity'>{allergy.severity}</div>
            <div styleName='note'>{allergy.note}</div>
          </div>
        )
      })
    }else{
      allergies =  <p>No known allergies</p>
    }

    return allergies
  }

  render() {
    return (
      <div>
        <p styleName='sectionTitle'>ALLERGIES</p>
        <div styleName='greyLine'></div>
        {this.renderAllergies()}
      </div>
    );
  }
}

export default CSSModules(Allergies, styles);
