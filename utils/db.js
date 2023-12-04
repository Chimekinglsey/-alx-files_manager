import { MongoClient } from 'mongodb';

class DBClient{
  constructor(){
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${this.host}:${this.port}/${this.database}`;
    this.client = new MongoClient(this.url);
    this.connection = null;
  }
  isAlive(){
    try{
      this.client.connect()
      this.connection = this.client.db()
      return true;
    }catch(err){
      console.error(`Connection failed: ${err}`);
      return false;
    }
    //return this.client.connect() === true
  }
  async nbUsers(){
    try {
      const collection = await this.connection.collection('users');
      const countAllUser = await collection.countDocuments();
      return countAllUser;
    }catch(err){
      console.error(`This Error occurred while counting users doc: ${err}`);
      //throw err
    }
  }
  async nbFiles(){
    try {
      const collection = await this.connection.collection('files');
      const countAllFile = await collection.countDocuments();
      return countAllFile
    }catch(err){
      console.error(`This Error occurred while counting files doc: ${err}`);
      //throw err
    }
  }
   async insertDocuments(collectionName, documents) {
    try {
      if (!this.connection) {
        throw new Error('No database connection');
      }
      const collection = this.connection.collection(collectionName);
      const result = await collection.insertMany(documents);
      return result;
    } catch (err) {
      console.error(`Error inserting documents: ${err}`);
      return null;
    }
  }

}

const dbClient = new DBClient();
module.exports = dbClient;
