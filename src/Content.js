import React, { Component } from 'react'
import './Content.css'
import Home from './home/Home'
import ConnectedErrorBar from './ErrorBar'

class Content extends Component {
  render() {
    return (
      <div className="Content">
        <ConnectedErrorBar />
        <Home />
      </div>
    );
  }
}

export default Content;
