import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import meanBy from 'lodash/meanBy';

const defaultOptions = {
  suboptimalWeight: 0.05,
}

export default function minimax(game, state, maximize = true, maxDepth = 9, options = defaultOptions) {
  const actions = game.getValidActions(state);
  return actions
    .map(action => {
      const nextState = game.performAction(state, action);
      const nextValue = game.getValue(nextState);
      let optimalDeepStates = [];
      let optimalDeepValue = 0;
      let suboptimalDeepValue = 0;
      if (maxDepth > 0 && !game.hasFinished(nextState)) {
        const deepMinimaxItems = minimax(game, nextState, !maximize, maxDepth - 1, options);
        const deepMinimax = maximize ?
          minBy(deepMinimaxItems, o => o.value) :
          maxBy(deepMinimaxItems, o => o.value);
        optimalDeepValue = deepMinimax.value;
        optimalDeepStates = deepMinimax.states;
        if (maximize) {
          const suboptimalItems = deepMinimaxItems
            .filter(o => o.action !== deepMinimax.action);
          suboptimalDeepValue = meanBy(suboptimalItems, o => o.value) || 0;
        }
      }
      return {
        action,
        states: [ nextState, ...optimalDeepStates],
        value: maximize ?
          nextValue +
            (1 - options.suboptimalWeight) * optimalDeepValue +
            options.suboptimalWeight * suboptimalDeepValue :
          nextValue + optimalDeepValue,
      };
    });
}
