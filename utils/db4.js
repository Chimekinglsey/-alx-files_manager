import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.uri = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(this.uri);
    this.connection = null;
  }

isAlive() {
    try {
      this.client.connect();
      this.connection = this.client.db(this.database);
      console.log('Connected successfully!')
      return true;
    } catch (err) {
      console.error(`Connection failed: ${err}`);
      return false;
    }
  }

  async nbUsers() {
    try {
      if (!this.connection){
        console.log('No connection')
        throw new Error('No database connection')
      }
      const collection = await this.connection.collection('users');
      const countAllUser = await collection.countDocuments();
      return countAllUser;
    } catch (err) {
      console.error(`This Error occurred while counting users doc: ${err}`);
      throw err;
    }
  }

  async nbFiles() {
    try {
      if (!this.connection){
        console.log('No connection')
        throw new Errror('No database connection');
      }
      const collection = await this.connection.collection('files');
      const countAllFile = await collection.countDocuments();
      return countAllFile;
    } catch (err) {
      console.error(`This Error occurred while counting files doc: ${err}`);
      throw err;
    }
  }
}
const dbClient = new DBClient();
module.exports = dbClient;
