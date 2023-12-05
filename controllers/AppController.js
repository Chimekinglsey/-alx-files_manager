const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const appController = {
  getStatus: async (req, resp) => {
    try {
      const redisStatus = await redisClient.isAlive();
      const dbStatus = await dbClient.isAlive();
      resp.status(200).json({ redis: redisStatus, db: dbStatus });
    } catch (err) {
      resp.status(500).json({ error: err });
    }
  },

  getStats: async (req, resp) => {
    try {
      const dbUsers = await redisClient.nbUsers();
      const dbFiles = await dbClient.nbFiles();
      resp.status(200).json({ user: dbUsers, files: dbFiles });
    } catch (err) {
      resp.status(500).json({ error: err });
    }
  },
};

module.exports = appController;
