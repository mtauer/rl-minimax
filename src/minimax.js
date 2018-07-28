import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';

export default function minimax(game, state, maximize = true, maxDepth = 5) {
  const actions = game.getValidActions(state);
  return actions
    .map(action => {
      const nextState = game.performAction(state, action);
      const nextValue = game.getValue(nextState);
      let deepMinimax = { value: 0, states: [] };
      if (maxDepth > 0 && !game.hasFinished(nextState)) {
        const deepMinimaxItems = minimax(game, nextState, !maximize, maxDepth - 1);
        deepMinimax = maximize ?
          minBy(deepMinimaxItems, o => o.value) :
          maxBy(deepMinimaxItems, o => o.value);
      }
      return {
        action,
        states: [ nextState, ...deepMinimax.states],
        value: nextValue + deepMinimax.value,
      };
    });
}
