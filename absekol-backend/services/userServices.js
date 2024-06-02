const User = require('../models/User');
const Role = require('../models/Role');

const createUser = async (email, password, nisn, noWa, roleId, username)=>{

    try {
        const user = await User.create({ email, password, nisn, noWa, roleId, username });
        return user
    } catch (error) {
            throw error.errors ? error : new Error(`Error creating : ${error.message}`);
    }
}
const getUser=async()=>{
    try {
        const users = await User.findAll({ include: Role });
        return users;
    } catch (error) {
        throw error.errors ? error : new Error(`Error fetchs : ${error.message}`);
    }
}
const updateUser = async (uid,updateData)=>{
    try {
        const user= await User.findByPk(uid);
        if (!user) throw new Error(`update failed, user uid ${uid} not found `)
        await user.update(updateData)
        return user;
    } catch (error) {
        throw error.errors ? error : new Error(`Error updating : ${error.message}`);

    }
}
const deleteUser = async (uid) => {
    try {
        const user = await User.findByPk(uid);
        if (!user) throw new Error(`delete failed, user uid ${uid} not found `)
        user.destroy();
        return true;
    } catch (error) {
        throw error.errors ? error : new Error(`Error deleting: ${error.message}`);
    }
}
module.exports={getUser,createUser,updateUser,deleteUser}