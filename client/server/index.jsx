import 'babel-polyfill';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import thunk from 'redux-thunk';
// import { createMemoryHistory } from 'history';
import reducers from '../src/redux/reducers';
import App from '../src/App';

const express = require('express');
const cors = require('cors');
const React = require('react');
const { renderToString } = require('react-dom/server');

const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const preCreateStore = () => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));
  return store;
};

const render = (req, store) => {
  const component = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <App />
      </StaticRouter>
    </Provider>,
  );
  // console.log('path:', req.path, 'store: ', store, 'component :', component);
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>NexDoordo</title>
        <link rel="stylesheet" type="text/css" href="/static/style.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>
      <body>
        <div id="app">${component}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};

app.get('/', (req, res) => {
  console.log('GOT IT')
  const store = preCreateStore();
  const html = render(req, store);
  console.log(html);
  res.status(400).send(html);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
