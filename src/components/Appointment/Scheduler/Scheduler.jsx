import React, {Component} from 'react';
import {withRouter} from 'react-router';

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
      <div>
        <button onClick={()=>this.onClickRelativeURLPush("patients")}>
          Patients</button>
        <button onClick={()=>this.onClickRelativeURLPush("appointment_types")}>
          AppointmentTypes</button>
        <button onClick={()=>this.onClickRelativeURLPush("slots")}>
          Slots</button>
      </div>
    );
  }
}

export const Scheduler = withRouter(_Scheduler);
