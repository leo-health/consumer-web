import React from 'react';
import ReactRouter from 'react-router'
import styles from './phr.css';
import {PhrHeader} from './phrHeader';
import PhrNotes from './phrNotes';
import Allergies from './allergies';
import Vitals from './vitals';
import Medications from './medications';
import Immunizations from './immunizations';
import CSSModules from 'react-css-modules';
import * as phrListActionCreators from './phrListActionCreators';
import {connect} from 'react-redux';
import {allEntitiesSelector} from '../../redux/selectors/entities_selectors';
import {withRouter} from 'react-router';

class _Phr extends React.Component{
  constructor(props) {
    super(props);
  }

  fetchNoteAndPhr(id){
    this.props.fetchPhrsAsync({id: id});
    this.props.fetchNoteAsync({id: id})
  }

  componentDidMount() {
    var id = this.props.params.id;
    if(id != 'default') this.fetchNoteAndPhr(id)
  }

  componentWillReceiveProps(nextProps){
    var nextId = nextProps.params.id;
    if(nextId != this.props.params.id && nextId != 'default') this.fetchNoteAndPhr(nextId);

    if(this.props.params.id === 'default' && nextProps.patients){
      this.context.router.push(`/phr/${nextProps.patients[0].id}`);
    }
  }

  renderSelector(){
    var phrs= ['allergies', 'medications', 'heights', 'weights', 'immunizations']; var isPhr = false;
    phrs.forEach(function(item){ if(this.props[item] && this.props[item].length > 0) isPhr = true }.bind(this));
    if(isPhr){
      return(
        <div styleName='lists'>
          <Vitals heights={this.props.heights} weights={this.props.weights} currentPatient={this.currentPatient()}/>
          <Allergies allergies={this.props.allergies}/>
          <Medications medications={this.props.medications}/>
          <Immunizations immunizations={this.props.immunizations}
                         fetchPdfAsync={this.props.fetchPdfAsync}
                         pdf={this.props.pdf}
                         params={this.props.params}/>
          <PhrNotes currentPatient={this.currentPatient()} notes={this.props.notes} params={this.props.params}/>
        </div>
      )
    }else{
      return(
        <div styleName='lists'>
          <div styleName='greyLine'></div>
          <p styleName='emptyText'>As your {this.checkPatientGender()} data becomes available this section will populate with important facts and figures
            related to her health and development</p>
          <PhrNotes currentPatient={this.currentPatient()} params={this.props.params}/>
        </div>
      )
    }
  }

  checkPatientGender(){
    var patient = this.currentPatient();
    if(!patient) return;
    return patient.sex === "M" ? "son's" : "daughter's"
  }

  currentPatient(){
    var selectedPatient;
    if(this.props.patients && this.props.params.id){
      this.props.patients.forEach(function(patient){
        if(patient.id === parseInt(this.props.params.id)) selectedPatient = patient
      }.bind(this))
    }
    return selectedPatient;
  }

  render() {
    return (
      <div styleName='container'>
        <PhrHeader params={this.props.params}
                   fetchPhrsAsync={this.props.fetchPhrsAsync}
                   currentPatient={this.currentPatient()} />
        {this.renderSelector()}
      </div>
    );
  }
}

_Phr.contextTypes = {
  router: React.PropTypes.object
};

function phrStateSelector(state) {
  return {
    patients: state.getIn(["schedulingPatient", "patients"]),
    allergies: state.getIn(["phrList", "allergies"]),
    medications: state.getIn(["phrList", "medications"]),
    immunizations: state.getIn(["phrList", "immunizations"]),
    heights: state.getIn(["phrList", "heights"]),
    weights: state.getIn(["phrList", "weights"]),
    notes: state.getIn(["patientNote", "notes"])
  };
}

export const Phr = connect(phrStateSelector, phrListActionCreators)(withRouter(CSSModules(_Phr, styles)));
