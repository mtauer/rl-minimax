import React, { Component } from 'react';
import styled from 'styled-components';

import ticTacToe, { X, O, E } from './ticTacToe';
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
  padding: 0 0 16px 0;
`;
const Description = styled.p`
  font-size: 12px;
  padding: 0 0 32px 0;
`;

class App extends Component {
  render() {
    const initialState = {
      board: [
        X, O, O,
        X, E, O,
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
