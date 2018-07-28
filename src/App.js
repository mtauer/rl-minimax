import React, { Component } from 'react';

import ticTacToe from './ticTacToe';
import minimax from './minimax';
import './App.css';

class App extends Component {
  render() {
    const values = minimax(undefined, ticTacToe);
    console.log('ticTacToe values', values);
    return (
      <div className="App">
        <h1>Tic Tac Toe</h1>
      </div>
    );
  }
}

export default App;
