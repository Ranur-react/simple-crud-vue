const dotenv = require('dotenv');
dotenv.config();

const { Sequelize, DataTypes } = require('sequelize');

const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
});

const Employee = sequelize.define('Employee', {
    idEmployee: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'tb_employee',
    timestamps: true,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await Employee.sync();
        console.log('The table for the Employee model was just (re)created!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, Employee, connectDB };
