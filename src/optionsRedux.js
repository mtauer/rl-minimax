import { E, X, O } from './ticTacToe';

const initialState = {
  initialGameState: {
    board: [
      E, O, E,
      E, E, X,
      E, E, E,
    ],
    currentPlayer: X,
  },
  minimaxOptions: {
    suboptimalWeight: 0.05,
    timePenalty: -0.01,
  }
}

const PREFIX = 'options/';
export const TOGGLE_BOARD_CELL = `${PREFIX}TOGGLE_BOARD_CELL`;
export const SET_MINIMAX_OPTIONS = `${PREFIX}SET_MINIMAX_OPTIONS`;

export function toggleBoardCellAction(index) {
  return { type: TOGGLE_BOARD_CELL, index };
}

export function setMinimaxOptionsAction(options) {
  return { type: SET_MINIMAX_OPTIONS, options };
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
    case SET_MINIMAX_OPTIONS: {
      const { options } = action;
      return {
        ...state,
        minimaxOptions: {
          ...state.minimaxOptions,
          ...options,
        }
      };
    }
    default: return state;
  }
}

export function getInitialGameState(state) {
  return state.initialGameState;
}

export function getMinimaxOptions(state) {
  return state.minimaxOptions;
}
