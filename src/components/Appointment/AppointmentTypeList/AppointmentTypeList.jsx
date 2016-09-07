import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actionCreators from '../../../redux/actions/appointment_type_list_action_creators';
import LoadingSpinner from '../../Generic/LoadingSpinner';

export class AppointmentTypeList extends Component {

  // TODO: separate this out [using object extension, inheritence?, find the right way]

  fetchAction() {
    return actionCreators.fetchAppointmentTypes();
  }

  selectAction(objectID) {
    return actionCreators.selectAppointmentType(objectID)
  }

  onClickObject(objectID) {
    // ????: this doesn't seem right to me.. probably should be in response to a given action, belongs in reducer?
    this.props.router.goBack();
  }

  renderRow(object) {
    return <h2>{object.get("name")}</h2>
  }



  // TODO: find a better name than "objects"
  // Generic

  componentDidMount() {
    this.props.dispatch(this.fetchAction());
  }

  selectObject(objectID) {
    this.props.dispatch(this.selectAction(objectID));
  }

  _onClickObject(objectID) {
    this.selectObject(objectID);
    this.onClickObject(objectID);
  }

  renderIfSelected(objectID) {

    // TODO: use css to signify selected state

    if (objectID === this.props.selectedObjectID) {
      return <h1>{"Selected"}</h1>;
    }
    return null;
  }

  render() {

    const {objects, isLoading} = this.props;

    if (isLoading || !objects) {
      return <LoadingSpinner/>;
    }

    return (
      <div>
        {objects.map(object=>{
          return (<button key={object.get("id")} onClick={()=>
              this._onClickObject(object.get("id"))
            }>
            {this.renderIfSelected(object.get("id"))}
            {this.renderRow(object)}
          </button>);
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    objects: state.get("objectList"),
    isLoading: state.get("isLoading"),
    selectedObjectID: state.get("selectedObjectID")
  };
}

const mapFullStateToProps = (statePath) => (fullState) => {
  const state = fullState.getIn(statePath);
  return mapStateToProps(state);
};

export const AppointmentTypeListContainer = connect(
  mapFullStateToProps(["schedulingAppointmentType"])
)(withRouter(AppointmentTypeList));
