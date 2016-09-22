import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../../redux/actions/patient_list_action_creators';
import {ItemSelectionList} from '../../Generic/ItemSelectionList';
import {allEntitiesSelector} from '../../../redux/selectors/entities_selectors';
import CSSModules from 'react-css-modules';
import styles from '../../Generic/item-selection-list.css';

export class _PatientList extends Component {

  // TODO: separate this out [using object extension, inheritence?, find the right way]
  // props? propType = function
  fetchAction() {
    return actionCreators.fetchPatients();
  }

  selectAction(object) {
    return actionCreators.selectPatient(object)
  }

  onClickObject(object) {
    // ????: this doesn't seem right to me.. probably should be in response to a given action, belongs in reducer?
    // NOTE: this actually pops the page off the history, instead of pushing the previous page. Maybe this is what we want.. not sure yet
    // This will not work if we hit this route directly, since there was nothing on the history before
    this.props.router.goBack();
  }

  renderRow(object) {
    return <div styleName='option'>{object.get("first_name")}</div>
  }

  // TODO: continue to explore abstraction strategies
  // The following is still duplicated across ItemSelectionList containers.
  render() {
    return(
      <ItemSelectionList
        fetchAction={()=>this.fetchAction()}
        selectAction={(object)=>this.selectAction(object)}
        onClickObject={(object)=>this.onClickObject(object)}
        renderRow={(object)=>this.renderRow(object)}
        {...this.props}
        />
    )
  }
}

function patientListSelector(state) {
  return {
    objectList: allEntitiesSelector(state, "patients"),
    isLoading: state.getIn(["schedulingPatient","isLoading"]),
    selectedObjectID: state.getIn(["schedulingPatient","selectedObjectID"])
  };
}

export const PatientListContainer = connect(patientListSelector)(withRouter(CSSModules(_PatientList, styles)));
