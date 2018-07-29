import { E, X, O } from './ticTacToe';

// Initial State

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

// Reducer

export default function optionsReducer(state = initialState, action) {
  switch (action.type) {
    default: return state;
  }
}

// Selectors

export function getInitialGameState(state) {
  return state.initialGameState;
}
