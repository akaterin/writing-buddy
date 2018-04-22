import React, { Component } from 'react';
import Menu from './Menu';
import Content from './Content';

import './App.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <Content />
      </div>
    );
  }
}

export default App;
