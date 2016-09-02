import React from 'react';
import * as actionCreators from '../action_creators';
import {vote} from '../action_creators';
import {connect} from 'react-redux';

export const Vote = React.createClass({
  getPair: function() {
    return this.props.pair || [];
  },

  isDisabled: function() {
    return !!this.props.votedFor;
  },

  hasVotedFor: function(entry) {
    return this.props.votedFor == entry;
  },

  votedForLabel: function(entry) {
    if (this.hasVotedFor(entry)) {
      return <div className = "label">Voted</div>;
    }
    return null;
  },

  buttonOnClick: function(entry) {
    return ()=>this.props.vote(entry);
  },
  render: function() {
    return(
      <div className="voting">
        {this.getPair().map((entry) =>
          <button
            key = {entry}
            disabled = {this.isDisabled()}
            onClick = {()=>this.props.vote(entry)}>
            <h1>{entry}</h1>
            {this.votedForLabel(entry)}
          </button>
        )}
      </div>
    );
  }
});

export default connect(null, actionCreators)(Vote);
