import React, {Component} from 'react';

export class Scheduler extends Component {

  constructor() {
    super();
    this.onClickPatients = () => this.props.onClickPatients();
    this.onClickAppointmentTypes = () => this.props.onClickAppointmentTypes();
    this.onClickSlots = () => this.props.onClickSlots();
  }

  render() {
    return (
      <div>
        <button onClick={this.onClickPatients}>Patients</button>
        <button onClick={this.onClickAppointmentTypes}>AppointmentTypes</button>
        <button onClick={this.onClickSlots}>Slots</button>
      </div>
    );
  }
}
