const { createUser,getUser,deleteUser,updateUser } = require('../services/userServices');

const creatUserController=async(req,res)=>{
    try {
        const { email, password, nisn, noWa, roleId }=req.body;
        const user = await createUser(email, password, nisn, noWa, roleId);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getUserController=async(req,res)=>{
    try {
        const users=await getUser();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const updateUserController=async(req,res)=>{
    try {
        const uid=req.body.uid;
        const user=await updateUser(uid,req.body);
        return res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deleteUserController=async(req,res)=>{
    try {
        const user=await deleteUser(req.params.id)
        return res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports={creatUserController,updateUserController,deleteUserController,getUserController}