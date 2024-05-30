const { error } = require('console');
const Role = require('../models/Role');

const createRole = async (roleName, detailRole) => {
    try {
        const role = await Role.create({ roleName, detailRole });
        return role;
    } catch (error) {
        throw new Error(`Error creating role: ${error.message}`);
    }
}
const getRole=async()=>{
    try {
        const roles = await Role.findAll();
        return roles;
    } catch (error) {
        throw new Error(`Error fetching roles: ${error.message}`);
    }
} 
const deleteRole = async (idRole) => {
    try {
        const role = await Role.findByPk(idRole)
        if(!role) throw new Error("Role not found");
        await  role.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error fetching roles: ${error.message}`);
    }
} 

module.exports={getRole,createRole, deleteRole}