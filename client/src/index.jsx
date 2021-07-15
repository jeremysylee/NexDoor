import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import store from './store';

import App from './components/App';

const root = document.getElementById('app');
ReactDOM.render(
  <Auth0Provider
    domain="dev-45974l81.us.auth0.com"
    clientId="GJJ6l6wKObYHurNxEEw9aOw4Jno1ndjk"
    redirectUri={window.location.origin}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>,
  root,
);
