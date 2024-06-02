const {createRole,getRole,deleteRole} = require('../services/roleServices');


const createRoleController=async(req,res)=>{
    try {
        const { roleName, detailRole}=req.body;
        const role = await createRole(roleName, detailRole);
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
const getRoleController=async(req,res)=>{
    try {
        const roles=await getRole();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
const deleteRoleControler=async(req,res)=>{
    try {
        await deleteRole(req.params.idRole);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports={createRoleController,getRoleController,deleteRoleControler};