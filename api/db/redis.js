const redis = require('redis');
const connectRedis = require('connect-redis');

const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
});

module.exports = redisClient;
