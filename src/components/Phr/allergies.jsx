import React from 'react';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class Allergies extends React.Component{
  constructor(props) {
    super(props);
  }

  renderAllergies() {
    this.props.allergies.forEach(function(allergy){
      return <div>{allergy.id}</div>
    })
  }

  render() {
    return (
      <div>
        <p styleName='sectionTitle'>ALLERGIES</p>
        <div styleName='greyLine'></div>
        <p>No known allergies</p>
        {this.renderAllergies()}
      </div>
    );
  }
};

export default CSSModules(Allergies, styles);
