import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import first from 'lodash/first';
import maxBy from 'lodash/maxBy';
import { scaleLinear } from 'd3-scale';
import { rgb } from 'd3-color';
import { interpolateHcl } from 'd3-interpolate';

const Board = styled.div`
  display: grid;
  font-size: ${props => props.size === 'small' ? '18px' : '24px'};
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: ${props => props.size === 'small' ? '30px' : '100px'};
  grid-gap: 1px;
  justify-items: stretch;
  padding: 0 0 32px 0;
  width: ${props => props.size === 'small' ? '90px' : '300px'};
`;
const Cell = styled.div`
  align-items: center;
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  display: flex;
  position: relative;
  text-align: center;
  user-select: ${props => props.isClickable ? 'none' : 'inherit'};

  &:hover {
    background: #f5f5f5;
  }
`;
const CellLabel = styled.div`
  display: block;
  flex: 1;
`;
const CellValue = styled.div`
  bottom: 4px;
  font-size: 12px;
  left: 0;
  position: absolute;
  right: 0;
`;

const TicTacToeBoard = ({
  gameState,
  nextActionValues,
  size,
  onCellClick
}) => {
  const bestNextAction = maxBy(nextActionValues, o => o.value);
  return (
    <Board size={size}>
      { gameState.board.map((v, i) => {
        const nextActionValue = nextActionValues ?
          first(nextActionValues.filter(o => o.action.index === i)) :
          null;
        const cellBgColor = getCellBgColor(nextActionValue);
        const cellBorder = getCellBorder(nextActionValue);
        return (
          <Cell
            key={`board-cell-${i}`}
            style={{ backgroundColor: cellBgColor, border: cellBorder }}
            isClickable={Boolean(onCellClick)}
            onClick={() => onCellClick && onCellClick(i)}
          >
            <CellLabel>
              {v}
            </CellLabel>
            { nextActionValue &&
              <CellValue>
                {nextActionValue.value.toFixed(3)}
              </CellValue>
            }
          </Cell>
        );
      })}
    </Board>
  );

  function getCellBgColor(nextActionValue) {
    if (!nextActionValues) { return null; }

    const valueColor = scaleLinear().domain([-1.0, 0.0, 1.0])
      .interpolate(interpolateHcl)
      .range([rgb('#a50026'), rgb('#ffffff'), rgb('#1a9850')]);
    return nextActionValue ? valueColor(nextActionValue.value) : '#cccccc';
  }

  function getCellBorder(nextActionValue) {
    return nextActionValue && nextActionValue.action === bestNextAction.action ?
      '8px solid #006837' :
      '0';
  }
};
TicTacToeBoard.propTypes = {
  gameState: PropTypes.object.isRequired,
  nextActionValues: PropTypes.array,
  size: PropTypes.string,
  onCellClick: PropTypes.func,
};
TicTacToeBoard.defaultProps = {
  nextActionValues: null,
  size: '',
  onCellClick: null,
};

export default TicTacToeBoard;
