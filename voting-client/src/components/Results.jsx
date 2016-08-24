import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
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
  next: function() {
    return this.props.next || (()=>{})
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
          ref={(ref)=>{
            console.log(this);
            this.nextVoteButton=ref;
            console.log(ref);
            console.log(this);
          }}
          onClick={this.next}> // .bind(this)
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
  return {
    pair: state.getIn(["vote", "pair"]),
    tally: state.getIn("vote", "tally"),
    winner: state.get("winner")
  };
}

const ResultsContainer = connect(mapStateToProps)(Results);

export {Results, ResultsContainer};
