const { sequelize, DataTypes } = require('../config/db');
const User = require('./User');

const Student=sequelize.define('Student',
{
    nisn:{
        type:DataTypes.STRING(30),
        primaryKey:true,
        allowNull: false
    },
    nama:{
        type:DataTypes.STRING(50),
    },
    jenisKelamin:{
        type:DataTypes.ENUM('L',"P"),
        allowNull:false
    },
    tempatLahir:{
        type:DataTypes.STRING(50)
    },
    tanggalLahir:{
        type:DataTypes.DATE
    },
    almamat:{
        type:DataTypes.STRING
    },
    hpOrtu:{
        type:DataTypes.STRING(14)
    }
},
    {
        tableName: 'Students',
        timestamps: true,

    }
)
module.exports=Student;