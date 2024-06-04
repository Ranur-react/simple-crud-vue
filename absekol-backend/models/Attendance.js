const { sequelize, DataTypes } = require('../config/db');
const Student = require('./Student');

const Attendance = sequelize.define('Attendance',
{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    checkIn:{
        type:DataTypes.DATE,
    },
    checkOut:{
        type:DataTypes.DATE,
    },
    isFakeGps:{
        type:DataTypes.BOOLEAN,
    },
    nisn:{
        type:DataTypes.STRING(30),
        allowNull:false,
        references:{
            model:Student,
            key:'nisn'
        },
    }
},{
    tableName:'Attendances',
    timestamps:true,
});
Student.hasMany(Attendance, { foreignKey: 'nisn' })
Attendance.belongsTo(Student,{foreignKey:'nisn'})

module.exports=Attendance;