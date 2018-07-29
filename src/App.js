import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ticTacToe from './ticTacToe';
import minimax from './minimax';
import TicTacToeBoard from './TicTacToeBoard';
import { getInitialGameState, getMinimaxOptions, toggleBoardCellAction,
  setMinimaxOptionsAction,
} from './optionsRedux';

const Container = styled.div`
  background-color: #ffffff;
  margin: 0 auto;
  max-width: 800px;
  min-height: 100vh;
  padding: 32px 48px;
`;
const Row = styled.div`
  display: flex;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-family: 'IBM Plex Sans', sans-serif;
  margin: 0;
  padding: 0 0 32px 0;
`;
const Description = styled.p`
  font-family: 'IBM Plex Serif', serif;
  padding: 0 0 8px 0;
`;
const Label = styled.label`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  padding: 0 0 6px 0;
`;
const Input = styled.input`
  background-color: #f5f5f5;
  border: 1px solid #f5f5f5;
  border-radius: 3px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  margin: 0 0 16px 0;
  max-width: 300px;
  outline: 0;
  padding: 4px 8px;
`;

const App = ({ initialGameState, minimaxOptions, onBoardCellClick, onOptionChange }) => {
  const nextActionValues = minimax(ticTacToe, initialGameState, minimaxOptions);
  return (
    <Container>
      <Title>Tic Tac Toe</Title>
      <Row>
        <Column>
          <Label>Initial State:</Label>
          <TicTacToeBoard
            gameState={initialGameState}
            size="small"
            onCellClick={onBoardCellClick}
          />
        </Column>
        <Column>
          <Label>Time Penalty:</Label>
          <Input
            defaultValue={minimaxOptions.timePenalty}
            onChange={e => onOptionChange('timePenalty', e)}
          />
          <Label>Suboptimal Weight:</Label>
          <Input
            defaultValue={minimaxOptions.suboptimalWeight}
            onChange={e => onOptionChange('suboptimalWeight', e)}
          />
        </Column>
      </Row>
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
  // eslint-disable-next-line react/forbid-prop-types
  minimaxOptions: PropTypes.object.isRequired,
  onBoardCellClick: PropTypes.func.isRequired,
  onOptionChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  initialGameState: getInitialGameState(state),
  minimaxOptions: getMinimaxOptions(state),
});
const mapDispatchToProps = dispatch => ({
  onBoardCellClick: (index) => dispatch(toggleBoardCellAction(index)),
  onOptionChange: (optionName, e) => {
    const value = parseFloat(e.target.value);
    if (isFinite(value)) {
      dispatch(setMinimaxOptionsAction({ [optionName]: value }));
    }
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
