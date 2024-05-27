const dotenv = require('dotenv');
dotenv.config();

const { Sequelize, DataTypes } = require('sequelize');

const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
});

const Role = sequelize.define('Role', {
    idRole: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    roleName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    tableName: 'tb_role',
    timestamps: true,
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
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'idRole',
        },
    },
}, {
    tableName: 'tb_employee',
    timestamps: true
});

Role.hasMany(Employee, { foreignKey: 'roleId' });
Employee.belongsTo(Role, { foreignKey: 'roleId' });

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await Role.sync();
        await Employee.sync({force:true});
        console.log('The tables for the Role and Employee models were just (re)created!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, Role, Employee, connectDB };
