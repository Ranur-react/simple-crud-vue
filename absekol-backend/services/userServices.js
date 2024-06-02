const User = require('../models/User');
const Role = require('../models/Role');

const createUser = async(email, password, nisn, noWa, roleId)=>{

    try {
        const user = await User.create({ email, password, nisn, noWa, roleId });
        return user
    } catch (error) {
        throw new Error(`Error creating role: ${error.message}`);
    }
}
const getUser=async()=>{
    try {
        const users = await User.findAll({ include: Role });
        return users;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
}
const updateUser = async (uid,updateData)=>{
    try {
        const user= await User.findByPk(uid);
        if (!user) throw new Error(`update failed, user uid ${uid} not found `)
        await user.update(updateData)
        return user;
    } catch (error) {
        throw new Error(`Error uptdating user: ${error.message}`);
    }
}
const deleteUser = async (uid) => {
    try {
        const user = await User.findByPk(uid);
        if (!user) throw new Error(`delete failed, user uid ${uid} not found `)
        user.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
}
module.exports={getUser,createUser,updateUser,deleteUser}