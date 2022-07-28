const sql = require('mysql2')

const db = sql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'

    },
    console.log('Connected to employee_db!')
);

// SELECT movie_reviews.movie_id, movie_reviews.review, movie_names.movie_name
// FROM movie_reviews
// LEFT JOIN movie_names ON movie_reviews.movie_id = movie_names.id;

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

async function viewEmployees(){
    db.query ('', (err, results)=>{
        err ? console.error(err) : console.table (results)
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

modules.export (viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRoleasync );
