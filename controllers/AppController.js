const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const appController = {
  getStatus: async (req, resp) => {
    try {
      const redisStatus = await redisClient.isAlive();
      const dbStatus = await dbClient.isAlive();
      resp.status(200).json({ redis: redisStatus, db: dbStatus });
    } catch (err) {
      resp.status(500).json({ error: "can't access redis!" });
    }
  },

  getStats: async (req, resp) => {
    try {
      const dbUsers = await dbClient.nbUsers();
      const dbFiles = await dbClient.nbFiles();
      console.log(dbFiles);
      resp.status(200).json({ users: dbUsers, files: dbFiles });
    } catch (err) {
      resp.status(500).json({ error: 'Fetching from database failed!' });
    }
  },
};

module.exports = appController;
