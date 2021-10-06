import App from '../src/App';

const express = require('express');
const cors = require('cors');
const path = require('path');
const React = require('react');
const { renderToString } = require('react-dom/server');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req, res) => {
  const component = renderToString(<App />);
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>NexDoor</title>
        <link rel="stylesheet" type="text/css" href="style.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>
      <body>
        <div id="app">${component}</div>
        <script src="./static/bundle.js"></script>
      </body>
    </html>
  `;
  res.send(html);
});

module.exports.app = app;
