const { Employee } = require('./db.js');

const createEmployee = async (name, role) => {
    try {
        const employee = await Employee.create({ name, role });
        return employee;
    } catch (error) {
        throw new Error(`Error creating employee: ${error.message}`);
    }
};

const getEmployees = async () => {
    try {
        const employees = await Employee.findAll();
        return employees;
    } catch (error) {
        throw new Error(`Error fetching employees: ${error.message}`);
    }
};

const updateEmployee = async (idEmployee, updatedData) => {
    try {
        const employee = await Employee.findByPk(idEmployee);
        if (!employee) throw new Error('Employee not found');

        await employee.update(updatedData);
        return employee;
    } catch (error) {
        throw new Error(`Error updating employee: ${error.message}`);
    }
};

const deleteEmployee = async (idEmployee) => {
    try {
        const employee = await Employee.findByPk(idEmployee);
        if (!employee) throw new Error('Employee not found');

        await employee.destroy();
        return true;
    } catch (error) {
        throw new Error(`Error deleting employee: ${error.message}`);
    }
};

module.exports = { createEmployee, getEmployees, updateEmployee, deleteEmployee };
