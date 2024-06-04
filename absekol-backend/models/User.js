const {sequelize,DataTypes} = require('../config/db');
const Role = require('./Role');
const Student = require('./Student');
const User=sequelize.define('User',
{
    uid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isLowercase: {
                msg: "please field with lower text format "
            },
            noSpaces(value) {
                if (/\s/.test(value)) {
                    throw new Error('Name cannot contain spaces');
                }
            },
        }
    },
    email:{
        type:DataTypes.STRING(50),
        allowNull:false,
        unique:true,
        validate:{
            isEmail:{
                msg:"please field with correct mail format ex: user@domain.com "
            }
        }
    },
    emailVerifiedAt:{
        type:DataTypes.DATE
    },
    password:{
        type:DataTypes.STRING
    },
    nisn:{
        type:DataTypes.STRING(30),
        unique: true,
        references:{
            model:Student,
            key:'nisn'
        }
    },
    token:{
        type:DataTypes.STRING(4)        
    },
    noWa:{
        type:DataTypes.STRING(14),
        allowNull:false
    },
    roleId:{
        type:DataTypes.INTEGER,
        references:{
            model: Role,
            key: 'idRole'
        }
    },
    tokenExpired:{
        type:DataTypes.DATE
    }

},
{
    tableName:'Users',
    timestamps:true,

}
);
Role.hasMany(User,{foreignKey:'roleId'})
User.belongsTo(Role,{foreignKey:'roleId'})

Student.hasMany(User,{foreignKey:'nisn'});
User.belongsTo(Student,{foreignKey:'nisn'});

module.exports=User;