import React from 'react';
import ReactDom from 'react-dom';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Recent from '../Recent/Recent';
import styles from './global.css';

export default React.createClass({
  getInitialState() {
    return {scroll: 0, expanded: true}
  },

  handleScroll() {
    var node = ReactDom.findDOMNode(this.refs.body);
    this.setState({scroll: node.scrollTop})
  },

  render() {
    var bodyClass = 'expanded-body';
    if(this.state.scroll > 15) {
      bodyClass = 'collapsed-body'
    }
    return (
      <div onScroll={this.handleScroll}>
        <Header scrollPosition={this.state.scroll}/>
        <Navbar scrollPosition={this.state.scroll}/>
          <div className={bodyClass}
               ref='body'>
            <Recent/>
            { this.props.children }
          </div>
      </div>
    );
  }
});
