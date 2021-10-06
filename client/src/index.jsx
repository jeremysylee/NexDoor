import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import App from './App';

const root = document.getElementById('app');
ReactDOM.hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  root,
);
