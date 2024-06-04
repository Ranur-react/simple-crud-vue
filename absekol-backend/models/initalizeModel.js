const {connectDB}=require('../config/db');
const Role = require('./Role')
const User = require('./User')
const Student = require('./Student')
const Attendance = require('./Attendance');
const NotificationLog = require('./notificationLog');
const GpsLog = require('./GpsLog');

const initializeDatabase = async()=>{
    try {
        await connectDB();
        await Role.sync();
        await Student.sync();
        await User.sync();
        await Attendance.sync();
        await NotificationLog.sync();
        await GpsLog.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error(`Unable to synchronize the database:`,error);

    }
}

module.exports=initializeDatabase;