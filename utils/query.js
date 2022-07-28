const sql = require('mysql2');
const cTable = require('console.table');

const db = sql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'

    },
    console.log('Connected to employee_db!')
);

async function viewDepartments(){
    db.query ('SELECT * FROM departments;', (err, results)=>{
        err ? console.error(err) : console.table (results)
    })
};

async function viewRoles(){
    db.query ('SELECT roles.id as "Role ID", roles.title AS "Title", roles.salary "Yearly Salary", departments.department_name AS Department FROM roles LEFT JOIN departments ON roles.department_id = departments.id ORDER BY departments.department_name', (err, results)=>{
        err ? console.error(err) : console.table (results)
    })
};

async function viewEmployeesByTitle(){
    db.query ('SELECT employees.first_name AS "First Name", employees.last_name AS "LAST NAME", employees.manager_id "Manager ID", roles.title AS Title, roles.salary AS "Yearly Salary", departments.department_name as Department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = department_id ORDER BY roles.title;', (err, results)=>{
        err ? console.error(err) : console.table (results);
    })
};

function viewEmployeesByManager(){
    db.query ('SELECT employees.first_name AS "First Name", employees.last_name AS "LAST NAME", employees.manager_id "Manager ID", roles.title AS Title, roles.salary AS "Yearly Salary", departments.department_name as Department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = department_id ORDER BY employees.manager_id;', (err, results)=>{
        err ? console.error(err) : console.table (results);
    })
};

function viewEmployeesByDepartment(){
    db.query ('SELECT employees.first_name AS "First Name", employees.last_name AS "LAST NAME", employees.manager_id "Manager ID", roles.title AS Title, roles.salary AS "Yearly Salary", departments.department_name as Department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = department_id ORDER BY departments.department_name;', (err, results)=>{
        err ? console.error(err) : console.table (results);
    })
};

async function addDepartment(){
    db.query ('', (err, results)=>{
        err ? console.error(err) : console.table (results)
    })
};

async function addRole(){
    db.query ('', (err, results)=>{
        err ? console.error(err) : console.table (results)
    })
};

async function addEmployee(){
    db.query ('', (err, results)=>{
        err ? console.error(err) : console.table (results)
    })
};


async function updateEmployeeRole(){
    db.query ('', (err, results)=>{
        err ? console.error(err) : console.table (results)
    })
}

module.exports = {viewDepartments, viewRoles, viewEmployeesByTitle, viewEmployeesByManager, viewEmployeesByDepartment, addDepartment, addRole, addEmployee, updateEmployeeRole};
