const { sequelize, DataTypes } = require('../config/db');

const Role = sequelize.define('Role',
    {
        idRole: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        roleName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        detailRole:{
            type:DataTypes.STRING
        }
    },
    {
        tableName:'Roles',
        timestamps:true
    }
)

module.exports=Role;