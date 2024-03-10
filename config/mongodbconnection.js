const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/mydatabase';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToMongoDB = async () => {
  try {
    const client = await MongoClient.connect(uri, options);
    console.log('Connected to MongoDB using MongoDB Node.js driver');
    return client;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

module.exports = connectToMongoDB;
