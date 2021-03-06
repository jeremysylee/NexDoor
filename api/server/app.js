require('dotenv').config();
// require('newrelic');

const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
const compression = require('compression');
const { logErrorMiddleware, returnError } = require('./errors/errorHandler');
const router = require('./router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));
app.use(cors({ origin: `http://localhost:${process.env.CLIENT_PORT}`, credentials: true }));

app.set('trust proxy', 1); // enable if using proxy/load balancer

const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
});

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SECRET,
  resave: true, // DO NOT DISABLE OR ELSE SESSIONS WONT BE SAVED WITH USER ID
  saveUninitialized: true,
  cookie: {
    secure: false, // HTTPS only (disable in production)
    httpOnly: false, // client can read cookie manually (disable in production)
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  },
}));

app.use(compression());
app.use('/api', router);
app.get('/loaderio-a7bbbdd11fe9bd5bf199f90e1c860262', (req, res) => {
  res.set({ contentType: 'text/plain', charset: 'utf-8' }).status(200).send('loaderio-a7bbbdd11fe9bd5bf199f90e1c860262');
});

app.use(express.static(path.join(__dirname, '..', 'client/index')));

// Error handling middleware:
app.use(logErrorMiddleware);
app.use(returnError);

module.exports.redisClient = redisClient;
module.exports.app = app;
