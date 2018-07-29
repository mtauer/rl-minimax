import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import optionsReducer from './optionsRedux';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

const store = createStore(optionsReducer);
const target = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  target
);

registerServiceWorker();
