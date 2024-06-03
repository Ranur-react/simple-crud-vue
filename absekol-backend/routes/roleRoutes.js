const express = require('express');
const {createRoleController,getRoleController,deleteRoleControler} =require('../controllers/roleController')

const route = express.Router();

route.post('/roles',createRoleController);
route.get('/roles',getRoleController);
route.delete('/roles/:idRole',deleteRoleControler);

module.exports=route;