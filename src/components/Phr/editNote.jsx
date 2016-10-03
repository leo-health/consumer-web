import React from 'react';
import ReactRouter from 'react-router'
import { Link } from 'react-router';
import styles from './phr.css';
import CSSModules from 'react-css-modules';
import * as phrListActionCreators from './phrListActionCreators';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class _EditNote extends React.Component {

  constructor() {
    super();
    this.state = { note: '' }
  }

  handleNoteChange(e){
    this.setState({ note: e.target.value.trim() })
  }

  submitNote(){
    this.props.postNoteAsync({ id: this.props.params.id, note: this.state.note })
  }

  render() {
    return (
      <div styleName='container'>
        <div styleName='noteHeader'>
          <p>Coco</p>
          <Link styleName='noteButton' onClick={()=>this.submitNote()} to={`/phr/${this.props.params.id}`}>DONE</Link>
        </div>
        <p styleName='notePrompt'>Please enter some notes about your child</p>
        <textarea onChange={(e)=>this.handleNoteChange(e)} autoFocus>
        </textarea>
      </div>
    );
  }
}

function editNoteSelector(state) {
  return {
    //note: state.getIn(["schedulingPatient", "note"])
  };
}

export const EditNote = connect(editNoteSelector, phrListActionCreators)(withRouter(CSSModules(_EditNote, styles)));
