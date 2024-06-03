const express = require('express');
const Controller = require('../controllers/studentController')

const route = express.Router();
route.post('/students',Controller.createStudentController);
route.get('/students', Controller.getStudentController);
route.put('/students', Controller.updateStudentController);
route.delete('/students/:nisn', Controller.deleteStudentController);


module.exports = route;