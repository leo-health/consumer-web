import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import * as actionCreators from '../action_creators';

class LoadingSpinner extends Component {
  render() {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}

export class SlotList extends Component {
  render() {
    const {slots, isLoading, ...other} = this.props;

    if (isLoading) {
      return <LoadingSpinner/>;
    }

    return (
      <div>
        {slots.map(slot=><h2>slot.time</h2>)}
      </div>
    );
  }
}

// function mapStateToProps(state) {
//
// }
//
// export const SlotsContainer = connect(mapStateToProps, actionCreators)(Results);
