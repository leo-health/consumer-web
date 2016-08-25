import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import Winner from './Winner';

const ResultsEntry = React.createClass({
  render: function() {
    return (
      <div className="entry">
        <h1>{this.props.entry}</h1>
        <div className="voteCount">
          {this.props.votes}
        </div>
      </div>
    );
  }
});


const ResultsEntries = React.createClass({
  render: function() {
    return (
      <div className="entries">
        {this.props.entries.map(entry =>
          <ResultsEntry
            key={entry.name} //https://fb.me/react-warning-keys
            entry={entry.name}
            votes={entry.votes}
            />
        )}
      </div>
    );
  }
});

const ResultsNoWinner = React.createClass({
  mixins: [PureRenderMixin],
  getPair: function() {
    return this.props.pair || [];
  },
  getVotes: function(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  },
  render: function() {
    return (
      <div className="results">
        <ResultsEntries entries={
            this.getPair().map(
              pair => ({name: pair, votes: this.getVotes(pair)})
            )
          }/>
        <button
          className="next-vote-button"
          onClick={this.props.next}>
          Next Vote
        </button>
      </div>
    );
  }
});

const Results = React.createClass({
  render: function() {
    const {winner, ...other} = this.props;
    return winner ?
      <Winner {...{winner}}/> :
        <ResultsNoWinner {...other}/>;
  }
});

function mapStateToProps(state) {
  debugger;
  return {
    pair: state.getIn(["vote", "pair"]),
    tally: state.getIn(["vote", "tally"]),
    winner: state.get("winner")
  };
}

const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);

export {Results, ResultsContainer};
