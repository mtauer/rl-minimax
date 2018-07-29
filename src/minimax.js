import minBy from 'lodash/minBy';
import maxBy from 'lodash/maxBy';
import meanBy from 'lodash/meanBy';

export default function minimax(game, state, options, maximize = true, maxDepth = 9) {
  const actions = game.getValidActions(state);
  return actions
    .map(action => {
      const nextState = game.performAction(state, action);
      const nextValue = game.getValue(nextState, options.timePenalty);
      let optimalDeepStates = [];
      let optimalDeepValue = 0;
      let suboptimalDeepValue = 0;
      if (maxDepth > 0 && !game.hasFinished(nextState)) {
        const deepMinimaxItems = minimax(game, nextState, options, !maximize, maxDepth - 1);
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
