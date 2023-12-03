const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.error('Redis connection error:', err);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    try {
      const value = await getAsync(key);
      return value;
    } catch (error) {
      console.error(`Error getting value from Redis: ${error}`);
      throw error;
    }
  }

  async set(key, value, duration) {
    try {
      await promisify(this.client.set).bind(this.client)(key, value, 'EX', duration);
    } catch (error) {
      console.error(`Error setting value in Redis: ${error}`);
      throw error;
    }
  }

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    try {
      await delAsync(key);
    } catch (error) {
      console.error(`Error deleting value from Redis: ${error}`);
      throw error;
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
