// utils/db.js

const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.connection = null;
    this.db = null;
  }

   isAlive() {
    try {
       this.client.connect();
      this.connection = this.client.isConnected();
      this.db = this.client.db();
      return this.connection;
    } catch (error) {
      return false;
    }
  }

  async nbUsers() {
    try {
      if (!this.connection) await this.client.connect();
      const usersCollection = this.db.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      throw new Error('Error counting users: ' + error);
    }
  }

  async nbFiles() {
    try {
      if (!this.connection) await this.client.connect();
      const filesCollection = this.db.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      throw new Error('Error counting files: ' + error);
    }
  }
}

const dbClient = new DBClient();
dbClient.isAlive(); // Ensure the connection is attempted immediately

module.exports = dbClient;

