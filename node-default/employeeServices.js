const { Employee, Role } = require('./db.js');

const createRole = async (roleName) => {
    try {
        const role = await Role.create({ roleName });
        return role;
    } catch (error) {
        throw new Error(`Error creating role: ${error.message}`);
    }
};

const createEmployee = async (name, roleId) => {
    try {
        const employee = await Employee.create({ name, roleId });
        return employee;
    } catch (error) {
        throw new Error(`Error creating employee: ${error.message}`);
    }
};

const getEmployees = async () => {
    try {
        const employees = await Employee.findAll({ include: Role });
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

module.exports = { createRole, createEmployee, getEmployees, updateEmployee, deleteEmployee };
