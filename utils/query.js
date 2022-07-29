//=============== Imports ===============
const sql = require('mysql2');
const cTable = require('console.table');
const util = require('util')

//=============== SQL Management ===============
const db = sql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'

    },
    console.log('Connected to employee_db!')
);

//This makes the sql2 db.query method return a promise by instantiating a promise version of the method on the object so that async await can be used 
db.queryPromisified = util.promisify(db.query)

//=============== SQL Queries ===============

// Simple view of departments query, with an alternate method for delivering information about the departmenets for other functions
async function viewDepartments(object) {
    let results = await db.queryPromisified('SELECT * FROM departments;')
    let departmentArr = []
    if (object) {
        //This for loop serves to create an array/object hybrid so that I can conveniently deliver an array of choices to the inquirer prompt while also having the department ids handy for lookups. This method is used in other functions as well. 
        for (let department of results) {
            departmentArr.push(department.department_name)
            departmentArr[department.department_name] = department.id
        }
        return departmentArr
    } else {
        console.table(results)
    }
};

//Simple role viewer like the above with additional data collection if the parameter is true
async function viewRoles(obj) {
    let roleArr = []
    let results = await db.queryPromisified('SELECT roles.id as "Role ID", roles.title AS "Title", roles.salary "Yearly Salary", departments.department_name AS Department FROM roles LEFT JOIN departments ON roles.department_id = departments.id ORDER BY departments.department_name')
    if (obj) {
        for (let role of results) {
            roleArr.push(role.Title)
            roleArr[role.Title] = role["Role ID"];
        }
        return roleArr
    } else {
        console.table(results)
    };
};

//Joined version of the database with all relevant points for employees
async function viewEmployees() {
    let results = await db.queryPromisified('SELECT employees.id as ID, employees.first_name AS "First Name", employees.last_name AS "LAST NAME", employees.manager_id "Manager ID", roles.title AS Title, roles.salary AS "Yearly Salary", departments.department_name as Department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = department_id ORDER BY roles.title;');
    console.table(results);
};

//Specific query to get a list of managers to sort the employees by
async function getManagers() {
    let managerArr = []
    let results = await db.queryPromisified('SELECT employees.first_name, employees.last_name, employees.id FROM employees WHERE role_id = 100')
    for (let manager of results) {
        managerArr.push(`${manager.first_name} ${manager.last_name}`);
        managerArr[`${manager.first_name} ${manager.last_name}`] = manager.id;
    }
    return managerArr;
}

//Takes in IDs from the above query when appropriately called.
async function viewEmployeesByManager(managerID) {
    let results = await db.queryPromisified('SELECT employees.id as ID, employees.first_name AS "First Name", employees.last_name AS "LAST NAME", employees.manager_id "Manager ID", roles.title AS Title, roles.salary AS "Yearly Salary", departments.department_name as Department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = department_id  WHERE employees.manager_id = ?;', managerID);
    console.table(results);
};

//Similar to above
async function viewEmployeesByDepartment(departmentID) {
    let results = await db.queryPromisified('SELECT employees.id as ID, employees.first_name AS "First Name", employees.last_name AS "LAST NAME", employees.manager_id "Manager ID", roles.title AS Title, roles.salary AS "Yearly Salary", departments.department_name as Department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = department_id WHERE roles.department_id = ?;', departmentID);
    console.table(results);
};

//The next 5 functions take in an array of values as determined by an inquirer prompt to create a new database entry of some kind, or to update an existing entry
async function addDepartment(newDepartment) {
    await db.queryPromisified('INSERT INTO departments (department_name) VALUES (?);', newDepartment);
    console.log('New Department Added!');
};

async function addRole(newRole) {
    await db.queryPromisified('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);', newRole)
    console.log('New Role Added!')
};

async function addEmployee(newEmployee) {
    await db.queryPromisified('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', newEmployee)
    console.log('Employee added!')
};

async function updateEmployeeRole(employeeUpdateRoleInfo) {
    await db.queryPromisified('UPDATE employees SET employees.role_id = ? WHERE employees.id = ?;', employeeUpdateRoleInfo);
    console.log(`Employee role updated!`);
};

async function updateEmployeeManager(employeeUpdateManagerInfo) {
    await db.queryPromisified('UPDATE employees SET employees.manager_id = ? WHERE employees.id = ?;', employeeUpdateManagerInfo)
    console.log('Manager updated!')
};

//Sums salary of all people in a department, requiers the get departments function for the parameter value
async function viewTotalBudget(department) {
    let results = await db.queryPromisified('SELECT SUM(roles.salary) AS Salary FROM employees LEFT JOIN roles ON roles.id = employees.role_id WHERE roles.department_id = ?;', department)
    console.table(results)
};

//Simple array of employees, critical for providing up to date employee lists for users to choose from 
async function getEmployeeList() {
    let nameArr = []
    let employeeArr = await db.queryPromisified('SELECT employees.first_name, employees.last_name, employees.id FROM employees;')
    for (let employee of employeeArr) {
        nameArr.push(`${employee.first_name} ${employee.last_name} (${employee.id})`);
        nameArr[`${employee.first_name} ${employee.last_name}`] = employee.id;
    }
    return nameArr
}

//Exporting to actionFunctions file
module.exports = { viewDepartments, viewRoles, viewEmployees, getManagers, viewEmployeesByManager, viewEmployeesByDepartment, addDepartment, addRole, addEmployee, updateEmployeeRole, updateEmployeeManager, viewTotalBudget, getEmployeeList };