import React from 'react';
import ReactRouter from 'react-router'
import { Link } from 'react-router';
import styles from './phr.css';
import CSSModules from 'react-css-modules';
import * as phrListActionCreators from './phrListActionCreators';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class _ExportPdf extends React.Component {
  constructor(props) {
    super(props);
  }

  handleNoteChange(e){
    this.setState({ note: e.target.value.trim() })
  }

  componentDidMount(){
    debugger
    this.props.fetchPdfAsync({id: this.props.params.id});
  }

  renderPdf() {
    if(this.props.pdf) return <embed src={this.props.pdf} width="800px" height="1100px"/>
  }

  render() {
    return (
      <div styleName='container'>
        <div styleName='noteHeader'>
          <p>Coco</p>
          <Link styleName='noteButton' onClick={()=>this.submitNote()} to={`/phr/${this.props.params.id}`}>DONE</Link>
        </div>
        {this.renderPdf()}
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
