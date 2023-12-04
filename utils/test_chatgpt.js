import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${this.host}:${this.port}/${this.database}`;
    this.client = new MongoClient(this.url);
    this.isAlive();
  }

  async isAlive() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB!');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }

  async nbUsers() {
    try {
      const usersCollection = this.client.db(this.database).collection('users');
      const countAllUser = await usersCollection.find({}).count();
      return countAllUser;
    } catch (err) {
      console.error(`Error occurred while counting users doc: ${err}`);
      throw err;
    }
  }

  async nbFiles() {
    try {
      const filesCollection = this.client.db(this.database).collection('files');
      const countAllFile = await filesCollection.find({}).count();
      return countAllFile;
    } catch (err) {
      console.error(`Error occurred while counting files doc: ${err}`);
      throw err;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;

