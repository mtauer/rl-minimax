import React from 'react';
import styled from 'styled-components';

const Board = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 100px;
  grid-gap: 1px;
  justify-items: stretch;
  width: 300px;
`;

const Cell = styled.div`
  font-size: 24px;
  text-align: center;
`;

const TicTacToeBoard = ({ gameState }) => (
  <Board>
    { gameState.board.map((v, i) => (
      <Cell key={`board-cell-${i}`}>{v}</Cell>
    )) }
  </Board>
);

export default TicTacToeBoard;
