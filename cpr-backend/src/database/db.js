const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');

const ConnectMSQL = new Sequelize('DBname', 'username', 'password', {
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

const connectDB = async () => {
  try {
    // Replace 'mongodb://localhost:27017/mydatabase' with your MongoDB connection string
    const conn = await mongoose.connect('mongodb+srv://master:SA123456@cprwebsite.s9f1e.mongodb.net/?retryWrites=true&w=majority&appName=CPRwebsite', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = ConnectMSQL, connectDB;