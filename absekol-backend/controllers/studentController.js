const Services = require('../services/studentServices');

const createStudentController=async(req,res)=>{
    try {
        const raw = req.body;
        const result=await Services.createStudent(raw);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "undfined case :" + error.message,
            errorDetails: error
        });
    }
}
const getStudentController=async(req,res)=>{
    try {
        const result=await Services.getStudent();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "undfined case :" + error.message,
            errorDetails: error
        });
    }
}
const updateStudentController=async(req,res)=>{
    try {
        const nisn=req.body.nisn;
        const result=await Services.updateStudent(nisn,req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "undfined case :" + error.message,
            errorDetails: error
        });       
    }
}
const deleteStudentController=async(res,req)=>{
    try {
        const result = await Services.deleteStudent(res.params.nisn);
        return res.status(204).send()
    } catch (error) {
        res.status(500).json({
            errors: error.errors ? error.errors[0].message : "undfined case :" + error.message,
            errorDetails: error
        });
    }
}

module.exports={createStudentController,getStudentController,deleteStudentController,updateStudentController}