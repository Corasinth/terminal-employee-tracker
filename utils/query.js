const sql = require('mysql2');
const cTable = require('console.table');
const util = require('util')

const db = sql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'

    },
    console.log('Connected to employee_db!')
);


db.queryPromisified = util.promisify(db.query)

async function viewDepartments() {
    await db.queryPromisified('SELECT * FROM departments;', (err, results) => {
        err ? console.error(err) : console.table(results);
    })
    console.log('done')
};

function viewRoles() {
    db.query('SELECT roles.id as "Role ID", roles.title AS "Title", roles.salary "Yearly Salary", departments.department_name AS Department FROM roles LEFT JOIN departments ON roles.department_id = departments.id ORDER BY departments.department_name', (err, results) => {
        err ? console.error(err) : console.table(results)
    })
};

function viewEmployees() {
    db.query('SELECT employees.id as ID, employees.first_name AS "First Name", employees.last_name AS "LAST NAME", employees.manager_id "Manager ID", roles.title AS Title, roles.salary AS "Yearly Salary", departments.department_name as Department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = department_id ORDER BY roles.title;', (err, results) => {
        err ? console.error(err) : console.table(results);
    })
};

async function getManagers() {
    let managerArr = []
    let results = await db.queryPromisified('SELECT employees.first_name, employees.last_name, employees.id FROM employees WHERE role_id = 100')
            for (let manager of results) {
                managerArr.push(`${manager.first_name} ${manager.last_name}`);
                managerArr[`${manager.first_name} ${manager.last_name}`] = manager.id;
            }
            console.log('all done')
            return managerArr;
}

function viewEmployeesByManager(managerID) {
    db.query('SELECT employees.id as ID, employees.first_name AS "First Name", employees.last_name AS "LAST NAME", employees.manager_id "Manager ID", roles.title AS Title, roles.salary AS "Yearly Salary", departments.department_name as Department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = department_id  WHERE employees.manager_id = ?;', managerID, (err, results) => {
        err ? console.error(err) : console.table(results);
    })
};

function viewEmployeesByDepartment() {
    db.query('SELECT employees.id as ID, employees.first_name AS "First Name", employees.last_name AS "LAST NAME", employees.manager_id "Manager ID", roles.title AS Title, roles.salary AS "Yearly Salary", departments.department_name as Department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = department_id ORDER BY departments.department_name;', (err, results) => {
        err ? console.error(err) : console.table(results);
    })
};

function addDepartment(newDepartment) {
    db.query('INSERT INTO departments (department_name) VALUES (?);', newDepartment, (err, results) => {
        err ? console.error(err) : console.table(results)
    })
};

function addRole(newRole) {
    db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);', newRole, (err, results) => {
        err ? console.error(err) : console.table(results)
    })
};

function addEmployee(newEmployee) {
    db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', newEmployee, (err, results) => {
        err ? console.error(err) : console.table(results)
    })
};

function updateEmployeeRole(employeeUpdateRoleInfo) {
    db.query('UPDATE employees SET employees.role_id = ? WHERE employees.id = ?;', employeeUpdateRoleInfo, (err, results) => {
        err ? console.error(err) : console.table(results)
    })
};

function updateEmployeeManager(employeeUpdateManagerInfo) {
    db.query('UPDATE employees SET employees.manager_id = ? WHERE employees.id = ?;', employeeUpdateManagerInfo, (err, results) => {
        err ? console.error(err) : console.table(results)
    })
};

function viewTotalBudget(department) {
    db.query('SELECT SUM roles.salary FROM roles WHERE roles.department_id = ?;', department, (err, results) => {
        err ? console.error(err) : console.log(`The department has a total employee budget of ${results}`)
    })
};

async function getEmployeeList() {
    let nameArr = []
    let employeeArr = await db.queryPromisified('SELECT employees.first_name, employees.last_name FROM employees;')
    for (let employee of employeeArr) {
        nameArr.push(`${employee.first_name} ${employee.last_name}`);
    }
    return nameArr
}

module.exports = { viewDepartments, viewRoles, viewEmployees, getManagers, viewEmployeesByManager, viewEmployeesByDepartment, addDepartment, addRole, addEmployee, updateEmployeeRole, updateEmployeeManager, viewTotalBudget, getEmployeeList };