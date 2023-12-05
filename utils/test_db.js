const MongoClient = require('mongodb').MongoClient;

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        this.client = new MongoClient(`mongodb://${host}:${port}/${database}`);
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to MongoDB successfully');
        } catch (error) {
            console.error('Failed to connect to MongoDB:', error);
        }
    }

    isAlive() {
        return this.client.isConnected();
    }

    async nbUsers() {
        const collection = this.client.db().collection('users');
        const count = await collection.countDocuments();
        return count;
    }

    async nbFiles() {
        const collection = this.client.db().collection('files');
        const count = await collection.countDocuments();
        return count;
    }
}

const dbClient = new DBClient();

module.exports = dbClient;

