import { E, X, O } from './ticTacToe';

const initialState = {
  initialGameState: {
    board: [
      E, O, E,
      E, E, X,
      E, E, E,
    ],
    currentPlayer: X,
  }
}

const PREFIX = 'options/';
export const TOGGLE_BOARD_CELL = `${PREFIX}TOGGLE_BOARD_CELL`;

export function toggleBoardCellAction(index) {
  return { type: TOGGLE_BOARD_CELL, index };
}

export default function optionsReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_BOARD_CELL: {
      const toggleCellMap = { [E]: X, [X]: O, [O]: E };
      const newBoard = state.initialGameState.board
        .map((c, i) => i === action.index ? toggleCellMap[c] : c );
      return {
        ...state,
        initialGameState: {
          ...state.initialGameState,
          board: newBoard,
        }
      };
    }
    default: return state;
  }
}

export function getInitialGameState(state) {
  return state.initialGameState;
}
