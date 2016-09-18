import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../../../redux/actions/schedule_action_creators';
import CSSModules from 'react-css-modules';
import styles from './scheduler.css';

// TODO: find a good pattern for these higher order components

class _Scheduler extends Component {

  relativeURLConcat(nextPath) {
    return [this.props.location.pathname,nextPath].join("/");
  }

  onClickRelativeURLPush(nextPath) {
    this.props.router.push(this.relativeURLConcat(nextPath));
  }

  render() {
    return (
      <div styleName='container'>
        <div onClick={()=>this.onClickRelativeURLPush("appointment_types")}
             styleName='option'>
          What are you coming in for?
          <div styleName='line'></div>
        </div>
        <div onClick={()=>this.onClickRelativeURLPush("patients")}
             styleName='option'>
          Which children need to be seen?
          <div styleName='line'></div>
        </div>
        <textarea defaultValue='Add any questions or comments you have about the appointment.'
                  styleName='text'></textarea>
        <div styleName='line'></div>
        <div onClick={()=>this.onClickRelativeURLPush("slots")}
             styleName='option'>
          When would you like to come in?
          <div styleName='line'></div>
        </div>
        <div onClick={()=>this.props.schedule()}
             styleName='button'>
          <div styleName='labelContainer'>
            <div styleName='label'>
              Confirm Visit
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // TODO: fill in
  };
}

export const Scheduler = connect(mapStateToProps, actionCreators)(withRouter(CSSModules(_Scheduler, styles)));
