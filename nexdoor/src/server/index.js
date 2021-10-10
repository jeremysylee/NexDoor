// on refactor to SSR, change filename to jsx.

const path = require('path');

// import 'babel-polyfill';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import { StaticRouter } from 'react-router';
// import thunk from 'redux-thunk';

// import { ServerStyleSheet } from 'styled-components';
// import reducers from '../src/redux/reducers';
// import App from '../src/App';

const express = require('express');
const expressStaticGzip = require('express-static-gzip');
// const React = require('react');
// const { renderToString } = require('react-dom/server');

const app = express();
const PUBLIC_DIR = path.join(__dirname, '../../public');

app.get('*.js', expressStaticGzip(PUBLIC_DIR, {
  enableBrotli: true,
}));
app.use(express.static(PUBLIC_DIR));
app.get('*', (req, res) => {
  res.sendFile(PUBLIC_DIR, 'index.html');
});

// const preCreateStore = () => {
//   const store = createStore(reducers, {}, applyMiddleware(thunk));
//   return store;
// };

// const render = (req, store) => {
//   const sheet = new ServerStyleSheet();
//   let component;
//   let styleTags;
//   try {
//     component = renderToString(sheet.collectStyles(
//       <Provider store={store}>
//         <StaticRouter location={req.path} context={{}}>
//           <App />
//         </StaticRouter>
//       </Provider>,
//     ));
//     styleTags = sheet.getStyleTags();
//   } catch (err) {
//     console.log(err);
//   } finally {
//     sheet.seal();
//   }
//   return `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>NexDoor</title>
//         ${styleTags}
//         <link rel="stylesheet" type="text/css" href="style.css">
//         <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
//       </head>
//       <body>
//         <div id="app">${component}</div>
//         <script src="/bundle.js"></script>
//         </body>
//     </html>
//   `;
// };

// app.get('/', (req, res) => {
//   const store = preCreateStore();
//   const html = render(req, store);
//   res.status(200).send(html);
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
