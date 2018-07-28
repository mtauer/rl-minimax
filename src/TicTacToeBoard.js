import React from 'react';
import styled from 'styled-components';
import first from 'lodash/first';
import maxBy from 'lodash/maxBy';
import { scaleLinear } from 'd3-scale';
import { rgb } from 'd3-color';
import { interpolateHcl } from 'd3-interpolate';

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
  bottom: 4px;
  font-size: 12px;
  left: 0;
  position: absolute;
  right: 0;
`;

const valueColor = scaleLinear().domain([-1.0, 1.0])
  .interpolate(interpolateHcl)
  .range([rgb('#d73027'), rgb('#1a9850')]);

const TicTacToeBoard = ({ gameState, nextActionValues }) => {
  const bestNextAction = maxBy(nextActionValues, o => o.value);
  return (
    <Board>
      { gameState.board.map((v, i) => {
        const nextActionValue = nextActionValues ?
          first(nextActionValues.filter(o => o.action.index === i)) :
          null;
        const cellBgColor = nextActionValue ? valueColor(nextActionValue.value) : '#f5f5f5';
        const cellBorder = nextActionValue.action === bestNextAction.action ? '3px solid #ffffff' : 0;
        return (
          <Cell key={`board-cell-${i}`} style={{ backgroundColor: cellBgColor, border: cellBorder }}>
            <CellLabel>{v}</CellLabel>
            { nextActionValue &&
              <ActionValue>{nextActionValue.value.toFixed(3)}</ActionValue>
            }
          </Cell>
        );
      })}
    </Board>
  );
};

export default TicTacToeBoard;
