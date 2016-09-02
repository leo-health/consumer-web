import React from 'react';
import {connect} from 'react-redux';
import Winner from "./Winner";
import Vote from './Vote';

function mapStateToProps(state) {
  return {
    pair: state.getIn(["vote", "pair"]),
    votedFor: state.get("votedFor"),
    winner: state.get("winner")
  };
}

export const Voting = React.createClass({
  render: function() {
    const {winner, ...props} = this.props;
    return winner?
      <Winner ref="winner" winner={winner}/> :
        <Vote {...props}/>;
  }
});

export const VotingContainer = connect(mapStateToProps)(Voting);
