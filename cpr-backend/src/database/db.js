const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');

const connectMSQL = new Sequelize('DBname', 'username', 'password', {
    host: 'localhost',
    dialect: 'mssql',
    port: 1433,
    dialectOptions: {
        options: {
          encrypt: false, // required for Azure
          trustServerCertificate: true // if you have a self-signed cert
        }
      },
      logging: false, // Disable logging queries to the console
});

module.exports = connectMSQL;

const uri = 'mongodb+srv://master:SA123456@cprwebsite.s9f1e.mongodb.net/?retryWrites=true&w=majority&appName=CPRwebsite';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    // Optionally, you can select the database you want to use
    const db = client.db('<dbname>');

    return db; // Return the db object to perform operations on the database
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if there is a connection error
  }
}

module.exports = connectDB;