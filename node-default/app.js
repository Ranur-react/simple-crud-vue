const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./db.js');
const { createRole, createEmployee, getEmployees, updateEmployee, deleteEmployee } = require('./employeeServices.js');

dotenv.config();
const app = express();
app.use(express.json());

const { PORT } = process.env;
const port = PORT || 3000;

connectDB();

app.post('/roles', async (req, res) => {
    try {
        const { roleName } = req.body;
        const role = await createRole(roleName);
        res.status(201).json(role);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/employees', async (req, res) => {
    try {
        const { name, roleId } = req.body;
        const employee = await createEmployee(name, roleId);
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/employees', async (req, res) => {
    try {
        const employees = await getEmployees();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/employees/:id', async (req, res) => {
    try {
        const idEmployee = req.params.id;
        const updatedData = req.body;
        const employee = await updateEmployee(idEmployee, updatedData);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/employees/:id', async (req, res) => {
    try {
        const idEmployee = req.params.id;
        await deleteEmployee(idEmployee);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
