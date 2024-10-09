const {DataTypes} = require('sequelize');
const sequelize = require('../src/database/db');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    tableName: 'Users' // Ensure to match the exact table name in the DB
});

module.exports = User