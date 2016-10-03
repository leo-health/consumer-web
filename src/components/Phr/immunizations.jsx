import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class Immunizations extends React.Component{
  dateFormatter(date) {
    var day = date.substring(8,10);
    var month = date.substring(5,7);
    var year = date.substring(2,4);
    return `${month}/${day}/${year}`
  }

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
            <p styleName='description'>{this.dateFormatter(immunization.administered_at)}</p>
            <p styleName='sideNote'></p>
          </div>
        )
      }.bind(this))
    }

    return immunizations
  }

  renderExportButton() {
    if (!this.props.immunizations) return;
    if (this.props.immunizations.length > 0) return <p styleName='sectionTitleRight' onClick={this.renderPdf}>EXPORT</p>;
  }

  renderPdf(){

  }

  render() {
    return (
        <div>
          <p styleName='sectionTitle'>IMMUNIZATIONS</p>
          {this.renderExportButton()}
          <div styleName='greyLine'></div>
          {this.renderImmunizations()}
        </div>
    )
  }
}

export default CSSModules(Immunizations, styles);
