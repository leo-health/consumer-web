import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class Allergies extends React.Component{
  renderAllergies() {
    if(!this.props.allergies) return;
    var allergies = this.props.allergies;
    if( allergies.length === 0 ){
      allergies =  <p styleName='emptyText'>No known allergies</p>
    }else{
      allergies = allergies.map(function(allergy, i){
        return (
          <div styleName='phrSection' key={i}>
            <p styleName='title'>{allergy.allergen}</p>
            <p styleName='description'>{allergy.severity}</p>
            <p styleName='sideNote'>{allergy.note}</p>
          </div>
        )
      })
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
