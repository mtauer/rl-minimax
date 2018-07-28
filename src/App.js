import React, { Component } from 'react';
import styled from 'styled-components';

import ticTacToe from './ticTacToe';
import minimax from './minimax';
import TicTacToeBoard from './TicTacToeBoard';

const Container = styled.div`
  background-color: #ffffff;
  margin: 0 auto;
  max-width: 600px;
  min-height: 100vh;
  padding: 32px 32px;
`;
const Title = styled.h1`
  margin: 0;
  padding: 0 0 32px 0;
`;

class App extends Component {
  render() {
    const values = minimax(undefined, ticTacToe);
    console.log('ticTacToe values', values);
    return (
      <Container>
        <Title>Tic Tac Toe</Title>
        <TicTacToeBoard gameState={ticTacToe.initialState} />
      </Container>
    );
  }
}

export default App;
