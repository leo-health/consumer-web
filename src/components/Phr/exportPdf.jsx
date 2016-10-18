import React from 'react';
import ReactRouter from 'react-router'
import { Link } from 'react-router';
import styles from './phr.css';
import CSSModules from 'react-css-modules';
import * as phrListActionCreators from './phrListActionCreators';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import spdf from "simple-react-pdf";

class _ExportPdf extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNoteChange(e){
    this.setState({ note: e.target.value.trim() })
  }

  render() {
    var shareUrl = require("../../images/share.png");
    return (
      <div styleName='container'>
        <div styleName='noteHeader'>
          <a href="mailto: w@gmail.com"><img  styleName='shareButton' src={shareUrl}/></a>
          <p>Coco</p>
          <Link styleName='noteButton' onClick={()=>this.submitNote()} to={`/phr/${this.props.params.id}`}>DONE</Link>
        </div>
        <spdf.SimplePDF
            file="http://lapi.ngrok.io/api/v1/patients/2/immunizations?authentication_token=xkKagDbiGxycgyr3edHu&response_type=pdf"/>
      </div>
    );
  }
}

function exportPdfSelector(state) {
  return {
    pdf: state.getIn(["immunizationPdf", "pdf"])
  };
}

export const ExportPdf = connect(exportPdfSelector, phrListActionCreators)(withRouter(CSSModules(_ExportPdf, styles)));
