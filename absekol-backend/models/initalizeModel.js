const {connectDB}=require('../config/db');
const Role = require('./Role')
const User = require('./User')

const initializeDatabase = async()=>{
    try {
        await connectDB();
        await Role.sync({force:true});
        await User.sync({ force: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error(`Unable to synchronize the database:`,error);

    }
}

module.exports=initializeDatabase;