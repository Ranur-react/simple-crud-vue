const express = require('express');
const {creatUserController,deleteUserController,getUserController,updateUserController,}=require('../controllers/userController')

const route = express.Router();
route.post('/users', creatUserController);
route.get('/users', getUserController);
route.put('users',updateUserController);
route.delete('/users', deleteUserController);


module.exports=route;