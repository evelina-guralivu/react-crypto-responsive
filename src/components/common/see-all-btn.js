import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

export default class SeeAllBtn extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    return(
  <div className='see-all'>
    {this.state.redirect && <Redirect
          to={{
            pathname: this.state.pathname,
            state: this.state.state
          }}
        />}
    <span className='see-all-text'>See All</span>
    <span className='see-all-btn' onClick={() => this.props.link()}>+</span>
  </div>
)}
        }