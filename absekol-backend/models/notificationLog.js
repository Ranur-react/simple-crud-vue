const { sequelize, DataTypes } = require('../config/db');
const User = require('./User');
const Attendance = require('./Attendance');

const notificationLog = sequelize.define('notificationLog',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    message:{
        type:DataTypes.STRING,
    },
    receiver:{
        type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.STRING,
    },
    attendanceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Attendance,
            key: 'id'
        }
    },
    uid:{
        type:DataTypes.INTEGER,
        references:{
            model:User,
            key:'uid'
        }
    }
},
{
    tableName:'notificationLogs',
    timestamps:true
}
);
Attendance.hasMany(notificationLog, { foreignKey:'attendanceId'})
notificationLog.belongsTo(Attendance, { foreignKey:'attendanceId'})

User.hasMany(notificationLog,{foreignKey:'uid'})
notificationLog.belongsTo(User,{foreignKey:'uid'})

module.exports=notificationLog;