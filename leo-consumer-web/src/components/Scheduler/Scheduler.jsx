import React, {Component} from 'react';
import {Link} from 'react-router';

export class Scheduler extends Component {
  render() {
    return (
      <div>
        <Link to={"patients"}>Patients</Link>
      </div>
    );
  }
}
