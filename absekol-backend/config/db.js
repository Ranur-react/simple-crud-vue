const path = require('path');
const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, DataTypes, connectDB };
