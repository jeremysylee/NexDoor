const express = require('express');
require('dotenv').config();

// const Router = express.Router();
const sessions = require('express-session');

const app = express();
const db = require('../controllers');

app.use(sessions({
  store: new (require('connect-pg-simple')(sessions)),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
}));

app.get('/')