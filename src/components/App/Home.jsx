import React from 'react';
import ReactDom from 'react-dom';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Recent from '../Recent/Recent';
import styles from './global.css';

export default React.createClass({
  getInitialState() {
    return {expanded: true}
  },

  handleScroll() {
    var node = ReactDom.findDOMNode(this.refs.body);
    if(node.scrollTop > 15) {
      this.setState({expanded: false})
    }
    else {
      this.setState({expanded: true})
    }
  },

  render() {
    var bodyClass = 'expanded-body';
    if(!this.state.expanded) { bodyClass = 'collapsed-body' }
    return (
      <div onScroll={this.handleScroll}>
        <Header expanded={this.state.expanded}/>
        <Navbar expanded={this.state.expanded}/>
          <div className={bodyClass}
               ref='body'>
            <Recent/>
            { this.props.children }
          </div>
      </div>
    );
  }
});
