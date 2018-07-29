import React, { Component } from 'react';
import styled from 'styled-components';

import ticTacToe, { X, O, E } from './ticTacToe';
import minimax from './minimax';
import TicTacToeBoard from './TicTacToeBoard';

const Container = styled.div`
  background-color: #ffffff;
  margin: 0 auto;
  max-width: 800px;
  min-height: 100vh;
  padding: 32px 32px;
`;
const Title = styled.h1`
  font-family: 'IBM Plex Sans', sans-serif;
  margin: 0;
  padding: 0 0 8px 0;
`;
const Description = styled.p`
  padding: 0 0 32px 0;
  font-family: 'IBM Plex Serif', serif;
`;

class App extends Component {
  render() {
    const initialState = {
      board: [
        E, O, E,
        E, E, X,
        E, E, E,
      ],
      currentPlayer: X,
    };
    const nextActionValues = minimax(ticTacToe, initialState);
    return (
      <Container>
        <Title>Tic Tac Toe</Title>
        <Description>Next turn is <strong>X</strong> and the next action values are optimized to help <strong>X</strong> win.</Description>
        <TicTacToeBoard
          gameState={initialState}
          nextActionValues={nextActionValues}
        />
      </Container>
    );
  }
}

export default App;
