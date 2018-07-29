import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import maxBy from 'lodash/maxBy';

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
const Section = styled.div`
  padding: 0 0 32px 0;
`;
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  font-family: 'IBM Plex Sans', sans-serif;
  margin: 0;
  padding: 0 0 16px 0;
`;
const Description = styled.p`
  font-family: 'IBM Plex Serif', serif;
  padding: 0 0 8px 0;
`;
const Label = styled.label`
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  padding: 0 0 8px 0;
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
  const bestNextAction = maxBy(nextActionValues, o => o.value);
  return (
    <Container>
      <Title>Minimax for Tic-Tac-Toe</Title>
      <Section>
        <Description>
          The following minimax example was inspired by a <a href="https://medium.com/ml-everything/tic-tac-toe-and-connect-4-using-mini-max-deb25544f3b7" target="_blank" rel="noopener noreferrer">blog post</a> from Branko Blagojevic and by this <a href="https://github.com/danigb/minimax" target="_blank" rel="noopener noreferrer">repository</a> from danigb.<br /><br />
        It extends the normal <a href="https://en.wikipedia.org/wiki/Minimax" target="_blank" rel="noopener noreferrer">Minimax</a> algorithm by a time penalty and a possibility of sub-optimal plays from <strong>O</strong>. By doing so, we try to finish early and also to benefit as much as possible from <strong>O</strong>s potential mistakes.
        </Description>
      </Section>
      <Section>
        <Row>
          <Column>
            <Label>Initial Boards:</Label>
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
            <Label>Sub-optimal Weight:</Label>
            <Input
              defaultValue={minimaxOptions.suboptimalWeight}
              onChange={e => onOptionChange('suboptimalWeight', e)}
            />
          </Column>
        </Row>
      </Section>
      <Section>
        <Description>The displayed values are optimized to help <strong>X</strong> win. It's <strong>X</strong>s turn.</Description>
        <TicTacToeBoard
          gameState={initialGameState}
          nextActionValues={nextActionValues}
        />
      </Section>
      <Section>
        <Label>Optiomal play for <strong>X</strong> and <strong>O</strong>:</Label>
        <Row>
          {
            bestNextAction.states.map((s, i) => (
              <TicTacToeBoard
                key={`best-next-actions-${i}`}
                gameState={s}
                size="small"
              />
            ))
          }
        </Row>
      </Section>
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
