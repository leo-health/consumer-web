import {expect} from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {Voting} from "../../src/components/Voting";

describe("voting", () => {

  it("renders a pair of buttons", () => {
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 days later"]}/>
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Trainspotting');
    expect(buttons[1].textContent).to.equal('28 days later');
  });

  it("invokes a callback when a button is clicked", () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;
    const component = renderIntoDocument(
      <Voting
        pair = {["Trainspotting", "28 days later"]}
        vote = {vote}/>
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal("Trainspotting");
  });

  it("displays voted and disables buttons", () => {
    const component = renderIntoDocument(
      <Voting
        pair = {["Trainspotting", "28 days later"]}
        hasVoted = "Trainspotting"/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

  });

});
