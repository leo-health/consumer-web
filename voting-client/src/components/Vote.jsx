import React from 'react';

const Vote = React.createClass({
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

  render: function() {
    return(
      <div className="voting">
        {this.getPair().map((entry) =>
          <button
            key = {entry}
            disabled = {this.isDisabled()}
            onClick = {() => this.props.vote(entry)}>
            <h1>{entry}</h1>
            {this.votedForLabel(entry)}
          </button>
        )}
      </div>
    );
  }
});

export default Vote;
