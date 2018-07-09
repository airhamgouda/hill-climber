import React, { Component } from 'react';
import logo from './logo.JPG';
import './ManualSearch.css';
import generateList from './API';



class ManualSearch extends Component {
  render() {
    return (
      <div className="ManualSearch">
        <header className="ManualSearch-header">
          <img src={logo} className="ManualSearch-logo" alt="logo" />
          <h1 className="ManualSearch-title">Hill Climber</h1>
        </header>
        <div id="trails">

        </div>
        <button onClick={generateList}>Generate List</button>
      </div>
    );
  }
}

export default ManualSearch;
