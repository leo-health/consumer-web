import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class Immunizaitions extends React.Component{
  renderImmunizations() {
    if(!this.props.immunizations) return;
    var immunizations = this.props.immunizations;
    if( immunizations.length > 0 ){
      immunizations = immunizations.map(function(immunization, i){
        return (
          <div styleName='immunization'>
            <div styleName='allergen'>{immunization.allergen}</div>
            <div styleName='severity'>{immunization.severity}</div>
            <div styleName='note'>{immunization.note}</div>
          </div>
        )
      })
    }else{
      medications =  <p>No active immunization</p>
    }

    return medications
  }

  render() {
    return (
        <div>
          <p styleName='sectionTitle'>IMMUNIZATIONS</p>
          <div styleName='greyLine'></div>
          {this.renderImmunizations()}
        </div>
    )
  }
};

export default CSSModules(Immunizaitions, styles);
