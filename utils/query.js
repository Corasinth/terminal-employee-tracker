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
    db.query ('', (err, results)=>{
        err ? console.error(err) : console.table (results)
    })
};

async function viewRoles(){
    db.query ('', (err, results)=>{
        err ? console.error(err) : console.table (results)
    })
};

async function viewEmployeesByTitle(){
    db.query ('SELECT employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.department_name FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = department_id ORDER BY roles.title;', (err, results)=>{
        err ? console.error(err) : console.table ('table', results); console.log ('log', results); console.log ('typeof', typeof results)
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

module.exports = {viewDepartments, viewRoles, viewEmployeesByTitle, addDepartment, addRole, addEmployee, updateEmployeeRole};
