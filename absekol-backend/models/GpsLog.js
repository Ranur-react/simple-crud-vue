const { sequelize, DataTypes } = require('../config/db');
const Attendance = require('./Attendance');

const GpsLog = sequelize.define('GpsLog',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    latitude:{
        type:DataTypes.STRING,
    },
    longtitude: {
        type: DataTypes.STRING,
    },
    attendanceId:{
        type: DataTypes.INTEGER,
        references:{
            model: Attendance,
            key:'id'
        }
    }
},
{
    tableName:'GpsLogs',
    timestamps:true
}
);
Attendance.hasMany(GpsLog, { foreignKey: 'attendanceId' })
GpsLog.belongsTo(Attendance, { foreignKey:'attendanceId'})
module.exports=GpsLog;