const {connectDB}=require('../config/db');
const Role = require('./Role')
const User = require('./User')
const Student = require('./Student')

const initializeDatabase = async()=>{
    try {
        await connectDB();
        await Role.sync();
        await User.sync();
        await Student.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error(`Unable to synchronize the database:`,error);

    }
}

module.exports=initializeDatabase;