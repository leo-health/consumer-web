import React from 'react';
import { Link } from 'react-router';
import styles from './phr.css';
import CSSModules from 'react-css-modules';

class PhrNotes extends React.Component{
  render() {
    return (
      <div>
        <p styleName='sectionTitle'>NOTES</p>
        <Link styleName='sectionTitleRight' to={`/phr/${parseInt(this.props.params.id)}/editNote`}>EDIT</Link>
        <div styleName='greyLine'></div>
        <p>Let us know if there are any special instructions not included in the form.</p>
      </div>
    )
  }
}

export default CSSModules(PhrNotes, styles);
