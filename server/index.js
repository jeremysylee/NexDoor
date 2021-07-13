const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const router = require('./router');
require('dotenv').config();
const sessions = require('express-session');

const app = express();
const port = 3500;
// const session = require('./routes/session');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());

app.use(sessions({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false,
  // secure: true, // only enable if https is enabled
  // store: new (require('connect-pg-simple')(sessions)),
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
}));

app.use('/api', router);

app.listen(port, () => {
  console.log(`app is listening at port: ${port}`);
});

app.use(express.static(path.join(__dirname, '..', 'client/index')));
