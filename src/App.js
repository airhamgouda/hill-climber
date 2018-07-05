import React, { Component } from 'react';
import logo from './logo.JPG';
import './App.css';
import generateList from './API';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hill Climber</h1>
        </header>
        <div id="trails">

        </div>
        <button onClick={generateList}>Generate List</button>
      </div>
    );
  }
}

export default App;
