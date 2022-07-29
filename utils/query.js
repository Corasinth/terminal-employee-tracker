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

async function viewDepartments(object) {
    let results = await db.queryPromisified('SELECT * FROM departments;')
    let departmentArr = []
    if (object) {   
        for (let department of results) {
            departmentArr.push(department.department_name)
            departmentArr[department.department_name] = department.id
        }
        return departmentArr
    } else {
        console.table(results)
    }
};

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
    }
};

function viewEmployees() {
    db.query('SELECT employees.id as ID, employees.first_name AS "First Name", employees.last_name AS "LAST NAME", employees.manager_id "Manager ID", roles.title AS Title, roles.salary AS "Yearly Salary", departments.department_name as Department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = department_id INNER JOIN employees ON employees.id = employees.manager_id ORDER BY roles.title;', (err, results) => {
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
            return managerArr;
}

async function viewEmployeesByManager(managerID) {
    let results = await db.queryPromisified('SELECT employees.id as ID, employees.first_name AS "First Name", employees.last_name AS "LAST NAME", employees.manager_id "Manager ID", roles.title AS Title, roles.salary AS "Yearly Salary", departments.department_name as Department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = department_id  WHERE employees.manager_id = ?;', managerID);
    console.table (results);
};

function viewEmployeesByDepartment() {
    db.query('SELECT employees.id as ID, employees.first_name AS "First Name", employees.last_name AS "LAST NAME", employees.manager_id "Manager ID", roles.title AS Title, roles.salary AS "Yearly Salary", departments.department_name as Department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = department_id ORDER BY departments.department_name;', (err, results) => {
        err ? console.error(err) : console.table(results);
    })
};

async function addDepartment(newDepartment) {
    await db.queryPromisified('INSERT INTO departments (department_name) VALUES (?);', newDepartment);
    console.log('New Department Added!');
    viewDepartments()
};

async function addRole(newRole) {
    await db.queryPromisified('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);', newRole)
    console.log ('New Role Added!')
};

async function addEmployee(newEmployee) {
    await db.queryPromisified('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', newEmployee)
    console.log ('Employee added!')
};

async function updateEmployeeRole(employeeUpdateRoleInfo) {
    await db.queryPromisified('UPDATE employees SET employees.role_id = ? WHERE employees.id = ?;', employeeUpdateRoleInfo);
    console.log(`Employee role updated!`);
};

async function updateEmployeeManager(employeeUpdateManagerInfo) {
    await db.queryPromisified('UPDATE employees SET employees.manager_id = ? WHERE employees.id = ?;', employeeUpdateManagerInfo)
    console.log('Manager updated!')
};

async function viewTotalBudget(department) {
    let results = await db.queryPromisified('SELECT SUM roles.salary FROM roles WHERE roles.department_id = ?;', department)
    console.table(results)
};

async function getEmployeeList() {
    let nameArr = []
    let employeeArr = await db.queryPromisified('SELECT employees.first_name, employees.last_name, employees.id FROM employees;')
    for (let employee of employeeArr) {
        nameArr.push(`${employee.first_name} ${employee.last_name} (${employee.id})`);
        nameArr[`${employee.first_name} ${employee.last_name}`] = employee.id;
    }
    return nameArr
}

module.exports = { viewDepartments, viewRoles, viewEmployees, getManagers, viewEmployeesByManager, viewEmployeesByDepartment, addDepartment, addRole, addEmployee, updateEmployeeRole, updateEmployeeManager, viewTotalBudget, getEmployeeList };