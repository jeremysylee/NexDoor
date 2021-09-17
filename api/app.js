require('dotenv').config();
// require('newrelic');

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
// const io = require('socket.io')(3000, { cors: { origin: '*' } });
const redis = require('redis');
const connectRedis = require('connect-redis');
const { logErrorMiddleware, returnError } = require('./errors/errorHandler');
const router = require('./router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
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

app.use('/api', router);
app.get('/loaderio-1a4211073599720da7419a4e8835d00b', (req, res) => {
  res.set({ contentType: 'text/plain', charset: 'utf-8' }).status(200).send('loaderio-1a4211073599720da7419a4e8835d00b');
});

app.use(express.static(path.join(__dirname, '..', 'client/index')));

// Error handling middleware:
app.use(logErrorMiddleware);
app.use(returnError);

// io.on('connection', (socket) => {
//   console.log('user connected');
//   // socket.on('join', (room) => {
//   //   socket.join(room);
//   // });
//   socket.on('send-message', ({ task, message }) => {
//     console.log(task);
//     socket.broadcast.emit(task, message);
//     // socket.to('room1').emit(message);
//   });
// });

module.exports.redisClient = redisClient;
module.exports.app = app;
