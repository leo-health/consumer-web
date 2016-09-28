import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import CSSModules from 'react-css-modules';
import ReactDom from 'react-dom';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Recent from '../Recent/Recent';
import styles from './global.css';

class _Home extends React.Component{
  constructor() {
    super();
    this.state = {expanded: true}
  }

  handleScroll() {
    var node = ReactDom.findDOMNode(this.refs.body);
    this.setState({expanded: node.scrollTop > 15})
  }

  render() {
    var bodyClass = 'expanded-body';
    if(!this.state.expanded) { bodyClass = 'collapsed-body' }
    return (
      <div onScroll={this.handleScroll}>
        <Header expanded={this.state.expanded}/>
        <Navbar expanded={this.state.expanded}/>
        <div className={bodyClass} ref='body'>
          <Recent/>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export const Home = CSSModules(_Home, styles);
