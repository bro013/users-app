
const { MongoClient, ObjectId } = require("mongodb")
require('dotenv').config()

class UserClient extends MongoClient {
    constructor(url, databaseName, collectionName) {
        if (!url || !databaseName || !collectionName) {
            throw new Error('Missing required parameters');
        }
        super(url);
        this.collection = this.db(databaseName).collection(collectionName);
    }

    async getUsers() {
        try {
            await this.connect();
            return await this.collection.find({}).toArray();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
        finally {
            await this.close();
        }
    }

    async getUser(id) {
        try {
            await this.connect()
            return await this.collection.find({ "_id": new ObjectId(id) }).toArray();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
        finally {
            await this.close();
        }

    }

    async deleteUser(id) {
        try {
            await this.connect()
            return await this.collection.deleteOne({ "_id": new ObjectId(id) });
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
        finally {
            await this.close();
        }

    }

    async insertUser(user) {
        if (!user) {
            throw new Error('User object is required');
        }
        try {
            await this.connect()
            return await this.collection.insertOne(user);
        } catch (error) {
            console.error('Error inserting user:', error);
            throw error;
        }
        finally {
            await this.close();
        }
    }
}

module.exports = new UserClient(process.env.MONGODB_URL, process.env.MONGODB_DATABASE, process.env.MONGODB_COLLECTION)