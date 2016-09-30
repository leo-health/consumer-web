import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class Immunizations extends React.Component{
  renderImmunizations() {
    if(!this.props.immunizations) return;
    var immunizations = this.props.immunizations;
    if( immunizations.length === 0 ){
      immunizations =  <p styleName='emptyText'>No active immunization</p>
    }else{
      immunizations = immunizations.map(function(immunization, i){
        return (
          <div styleName='phrSection' key={i}>
            <p styleName='title'>{immunization.vaccine}</p>
            <p styleName='description'>{immunization.administered_at}</p>
            <p styleName='sideNote'></p>
          </div>
        )
      })
    }

    return immunizations
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
}

export default CSSModules(Immunizations, styles);
