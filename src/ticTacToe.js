import isEmpty from 'lodash/isEmpty';

const E = '.';
const X = 'X';
const O = 'O';

const initialState = {
  board: [
    X, O, O,
    X, E, O,
    E, E, E,
  ],
  currentPlayer: X,
};

const timePenalty = -0.01;

export function getValidActions(state = initialState) {
  return state.board
    .map((v, i) => v === E ? { index: i } : null)
    .filter(i => Boolean(i));
}

export function performAction(state = initialState, action) {
  const { index } = action;
  const { board, currentPlayer } = state;
  return {
    board: board.map((v, i) => i === index ? currentPlayer : v),
    currentPlayer: currentPlayer === X ? O : X,
  };

}

export function getValue(state = initialState) {
  const winner = getWinner(state);
  return winner === X ? 1 : winner === O ? -1 : timePenalty;
}

export function hasFinished(state = initialState) {
  const winner = getWinner(state);
  const validAction = getValidActions(state);
  return Boolean(winner) || isEmpty(validAction);
}

const winningIndices = [
  // horizontal
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  // vertical
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  // diagonal
  [0, 4, 8], [6, 4, 2]
]

function getWinner(state) {
  const { board } = state;
  return winningIndices
    .map(iArray => board[iArray[0]] !== E &&
      board[iArray[0]] === board[iArray[1]] &&
      board[iArray[1]] === board[iArray[2]] ? board[iArray[0]] : null)
    .filter(v => Boolean(v))[0];
}

export default {
  getValidActions,
  performAction,
  getValue,
  hasFinished,
  initialState,
}
