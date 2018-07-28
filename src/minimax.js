import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';

export default function minimax(state, game, maximize = true, maxDepth = 5) {
  const actions = game.getValidActions(state);
  return actions
    .map(action => {
      const nextState = game.performAction(state, action);
      const nextValue = game.getValue(nextState);
      let deepMinimax = { value: 0, states: [], action };
      if (maxDepth > 0 && !game.hasFinished(nextState)) {
        const deepMinimaxItems = minimax(nextState, game, !maximize, maxDepth - 1);
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
