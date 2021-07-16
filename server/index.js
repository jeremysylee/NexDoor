const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const router = require('./router');
require('dotenv').config();
const redis = require('redis');
const connectRedis = require('connect-redis');

const app = express();
const port = 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());

// app.set('trust proxy', 1); // enable if using proxy/load balancer
const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
});

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.IN_PROD, // HTTPS only (disable in production)
    httpOnly: process.env.IN_PROD, // client can read cookie manually (disable in production)
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  },
}));

app.use('/api', router);

app.listen(port, () => {
  console.log(`app is listening at port: ${port}`);
});

app.use(express.static(path.join(__dirname, '..', 'client/index')));
