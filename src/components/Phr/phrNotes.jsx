import React from 'react';
import { Link } from 'react-router';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class PhrNotes extends React.Component{
  renderNotes(){
    if(!this.props.notes) return;
    if(this.props.notes.length > 0){
      return <p>{`${this.props.notes[0].note}`}</p>
    }else{
      return <p>Let us know if there are any special instructions not included in the form.</p>
    }
  }

  render() {
    return (
      <div>
        <p styleName='sectionTitle'>NOTES</p>
        <Link styleName='sectionTitleRight' to={`/phr/${parseInt(this.props.params.id)}/editNote`}>EDIT</Link>
        <div styleName='greyLine'></div>
        {this.renderNotes()}
      </div>
    )
  }
}

export default CSSModules(PhrNotes, styles);
