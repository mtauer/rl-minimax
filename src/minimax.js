import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import meanBy from 'lodash/meanBy';

const suboptimalWeight = 0.05;

export default function minimax(game, state, maximize = true, maxDepth = 9) {
  const actions = game.getValidActions(state);
  return actions
    .map(action => {
      const nextState = game.performAction(state, action);
      const nextValue = game.getValue(nextState);
      let deepMinimax = { value: 0, states: [] };
      let suboptimalValue = 0;
      if (maxDepth > 0 && !game.hasFinished(nextState)) {
        const deepMinimaxItems = minimax(game, nextState, !maximize, maxDepth - 1);
        deepMinimax = maximize ?
          minBy(deepMinimaxItems, o => o.value) :
          maxBy(deepMinimaxItems, o => o.value);
        if (maximize) {
          const suboptimalItems = deepMinimaxItems
            .filter(o => o.action !== deepMinimax.action);
          suboptimalValue = meanBy(suboptimalItems, o => o.value) || 0;
        }
      }
      return {
        action,
        states: [ nextState, ...deepMinimax.states],
        value: nextValue + (1 - suboptimalWeight) * deepMinimax.value + suboptimalWeight * suboptimalValue,
      };
    });
}
