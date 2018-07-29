import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ticTacToe from './ticTacToe';
import minimax from './minimax';
import TicTacToeBoard from './TicTacToeBoard';
import { getInitialGameState } from './optionsRedux';

const Container = styled.div`
  background-color: #ffffff;
  margin: 0 auto;
  max-width: 800px;
  min-height: 100vh;
  padding: 32px 48px;
`;
const Title = styled.h1`
  font-family: 'IBM Plex Sans', sans-serif;
  margin: 0;
  padding: 0 0 8px 0;
`;
const Description = styled.p`
  font-family: 'IBM Plex Serif', serif;
  padding: 0 0 8px 0;
`;

const App = ({ initialGameState }) => {
  const nextActionValues = minimax(ticTacToe, initialGameState);
  return (
    <Container>
      <Title>Tic Tac Toe</Title>
      <Description>Initial state and options</Description>
      <TicTacToeBoard
        gameState={initialGameState}
        size="small"
      />
      <Description>The displayed action values are optimized to help <strong>X</strong> win. Next turn is <strong>X</strong>.</Description>
      <TicTacToeBoard
        gameState={initialGameState}
        nextActionValues={nextActionValues}
      />
    </Container>
  );
};
App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  initialGameState: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  initialGameState: getInitialGameState(state),
});
export default connect(mapStateToProps)(App);
