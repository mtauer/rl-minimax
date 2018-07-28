import React from 'react';
import styled from 'styled-components';
import first from 'lodash/first';

const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 100px;
  grid-gap: 1px;
  justify-items: stretch;
  width: 300px;
`;
const Cell = styled.div`
  align-items: center;
  display: flex;
  font-size: 24px;
  position: relative;
  text-align: center;
`;
const CellLabel = styled.div`
  display: block;
  flex: 1;
`;
const ActionValue = styled.div`
  bottom: 0;
  font-size: 12px;
  left: 0;
  position: absolute;
  right: 0;
`;

const TicTacToeBoard = ({ gameState, nextActionValues }) => (
  <Board>
    { gameState.board.map((v, i) => {
      const nextActionValue = nextActionValues ?
        first(nextActionValues.filter(o => o.action.index === i)) :
        null;
      return (
        <Cell key={`board-cell-${i}`}>
          <CellLabel>{v}</CellLabel>
          { nextActionValue &&
            <ActionValue>{nextActionValue.value}</ActionValue>
          }
        </Cell>
      );
    })}
  </Board>
);

export default TicTacToeBoard;
