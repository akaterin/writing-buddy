import React, { Component } from 'react';
import './Content.css';
import Home from './home/Home';

class Content extends Component {
  render() {
    return (
      <div className="Content">
        <Home />
      </div>
    );
  }
}

export default Content;
