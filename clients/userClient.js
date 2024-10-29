
const { MongoClient, ObjectId } = require("mongodb")
require('dotenv').config()

class UserClient extends MongoClient {

    constructor() {
        super(process.env.MONGODB_URL);
        this._collection = this.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION);
    }

    async init() {
        try {
            await this.connect();
            console.log("Connected to database");

        } catch (error) {
            console.error('Error connecting to database:', error);
            throw error;
        }
    }

    async disconnect() {
        try {
            await this.close();
            console.log("Diconnected from database");

        } catch (error) {
            console.error('Error disconnecting to database:', error);
            throw error;
        }
    }

    async getUsers() {
        try {
            return await this._collection.find({}).toArray();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async getUser(id) {
        try {
            this.co
            return await this._collection.find({ "_id": new ObjectId(id) }).toArray();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }

    }

    async deleteUser(id) {
        try {
            return await this._collection.deleteOne({ "_id": new ObjectId(id) });
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }

    }

    async insertUser(user) {
        if (!user) {
            throw new Error('User object is required');
        }
        try {
            await this.connect()
            return await this._collection.insertOne(user);
        } catch (error) {
            console.error('Error inserting user:', error);
            throw error;
        }
    }
}

module.exports = new UserClient()